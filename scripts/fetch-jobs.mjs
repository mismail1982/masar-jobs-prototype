import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const feeds = [
  { type: 'lever', token: 'aldar', company: 'Aldar Properties' },
  { type: 'lever', token: 'kpler', company: 'Kpler' },
  { type: 'lever', token: 'binance', company: 'Binance' },
  { type: 'lever', token: 'weloglobal', company: 'Welo Data' },
  { type: 'greenhouse', token: 'gener8tor', company: 'gener8tor' },
  { type: 'greenhouse', token: 'alphasights', company: 'AlphaSights' },
  { type: 'greenhouse', token: 'cialfo', company: 'Cialfo' },
  { type: 'greenhouse', token: 'sonymusicasiacareers', company: 'Sony Music' }
];

const gulfPattern = /saudi|riyadh|jeddah|dammam|khobar|uae|united arab emirates|dubai|abu dhabi|qatar|doha|kuwait|bahrain|manama|oman|muscat|middle east|mena|gcc/i;
const stripHtml = value => String(value || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const hash = value => { let h = 2166136261; for (const char of value) { h ^= char.charCodeAt(0); h = Math.imul(h, 16777619); } return Math.abs(h >>> 0) + 100000000; };
const detectCountry = location => {
  if (/saudi|riyadh|jeddah|dammam|khobar/i.test(location)) return 'السعودية';
  if (/uae|united arab emirates|dubai|abu dhabi/i.test(location)) return 'الإمارات';
  if (/qatar|doha/i.test(location)) return 'قطر';
  if (/kuwait/i.test(location)) return 'الكويت';
  if (/bahrain|manama/i.test(location)) return 'البحرين';
  if (/oman|muscat/i.test(location)) return 'عُمان';
  return 'الخليج / الشرق الأوسط';
};
const detectCity = location => {
  const cities = [['Riyadh','الرياض'],['Jeddah','جدة'],['Dammam','الدمام'],['Khobar','الخبر'],['Dubai','دبي'],['Abu Dhabi','أبوظبي'],['Doha','الدوحة'],['Kuwait','الكويت'],['Manama','المنامة'],['Muscat','مسقط']];
  return cities.find(([english]) => location.toLowerCase().includes(english.toLowerCase()))?.[1] || (location || 'الشرق الأوسط');
};
const detectCategory = title => {
  const value = title.toLowerCase();
  if (/architect|architecture|bim/.test(value)) return 'architecture';
  if (/civil|structural|construction|site engineer/.test(value)) return 'civil';
  if (/mechanical|mep|hvac/.test(value)) return 'mechanical';
  if (/electrical|power engineer/.test(value)) return 'electrical';
  if (/project|program|pmo|planning/.test(value)) return 'projects';
  return 'engineering';
};
const detectSkills = text => ['Revit','AutoCAD','BIM','MEP','HVAC','Primavera P6','PMP','Python','JavaScript','React','SQL','SAP','Power BI','Sales','Marketing','Finance','Compliance','Operations','Leadership'].filter(skill => text.toLowerCase().includes(skill.toLowerCase())).slice(0, 7);
const age = date => {
  if (!date) return 'حديثًا'; const days = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 86400000));
  return days === 0 ? 'اليوم' : days === 1 ? 'أمس' : `منذ ${days} أيام`;
};

async function fetchJson(url) {
  const response = await fetch(url, { headers: { 'user-agent': 'MasarJobs/1.0 (+https://mismail1982.github.io/masar-jobs-prototype/)' } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
}

async function readFeed(feed) {
  if (feed.type === 'lever') {
    const rows = await fetchJson(`https://api.lever.co/v0/postings/${feed.token}?mode=json`);
    return rows.map(row => {
      const location = row.categories?.allLocations?.join(' / ') || row.categories?.location || '';
      const description = stripHtml([row.descriptionPlain, ...(row.lists || []).map(item => `${item.text}: ${stripHtml(item.content)}`)].filter(Boolean).join(' '));
      return { rawId: row.id, title: row.text, company: feed.company, location, description, url: row.hostedUrl || row.applyUrl, date: row.createdAt ? new Date(row.createdAt).toISOString() : null, mode: row.workplaceType || row.categories?.commitment || 'غير محدد', source: `Lever · ${feed.company}` };
    });
  }
  const data = await fetchJson(`https://boards-api.greenhouse.io/v1/boards/${feed.token}/jobs?content=true`);
  return (data.jobs || []).map(row => ({ rawId: row.id, title: row.title, company: feed.company, location: row.location?.name || '', description: stripHtml(row.content), url: row.absolute_url, date: row.updated_at || null, mode: /remote/i.test(row.location?.name || '') ? 'عن بُعد' : 'غير محدد', source: `Greenhouse · ${feed.company}` }));
}

const collected = [];
for (const feed of feeds) {
  try { collected.push(...await readFeed(feed)); }
  catch (error) { console.warn(`Skipped ${feed.company}: ${error.message}`); }
}

const unique = new Map();
for (const row of collected) {
  const searchable = `${row.title} ${row.location} ${row.description}`;
  if (!gulfPattern.test(`${row.location} ${row.title}`)) continue;
  const key = `${row.company}|${row.title}|${row.location}`.toLowerCase();
  if (unique.has(key)) continue;
  const skills = detectSkills(searchable);
  unique.set(key, {
    id: hash(`${row.source}:${row.rawId}`),
    externalId: String(row.rawId),
    title: row.title,
    company: row.company,
    country: detectCountry(row.location),
    region: row.location,
    location: detectCity(row.location),
    mode: /remote/i.test(`${row.mode} ${row.location}`) ? 'عن بُعد' : /hybrid/i.test(row.mode) ? 'هجين' : 'حضوري',
    minSalary: 0,
    maxSalary: 0,
    salaryDisclosed: false,
    minExp: 0,
    maxExp: 30,
    category: detectCategory(row.title),
    age: age(row.date),
    publishedAt: row.date,
    skills: skills.length ? skills : ['راجع الوصف الوظيفي'],
    description: row.description.slice(0, 4000) || 'التفاصيل متاحة في الإعلان الأصلي.',
    source: row.source,
    externalUrl: row.url,
    isLive: true
  });
}

const jobs = [...unique.values()].sort((a, b) => String(b.publishedAt || '').localeCompare(String(a.publishedAt || ''))).slice(0, 300);
const output = { generatedAt: new Date().toISOString(), total: jobs.length, feeds: feeds.length, jobs };
const outputPath = resolve(process.argv[2] || 'docs/live-jobs.json');
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
console.log(`Saved ${jobs.length} live Gulf jobs from ${feeds.length} public company feeds.`);
