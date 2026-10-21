(function () {
  'use strict';

  const STORAGE_KEY = 'masar_candidate_profile_v2';
  const FILE_DB = 'masar_candidate_files';
  const FILE_STORE = 'files';
  let savedFiles = [];

  const ar = {
    title: 'ملفي المهني', subtitle: 'كلما كانت بياناتك أدق، أصبحت ترشيحات الوظائف وخطابات التقديم أفضل.',
    personal: 'البيانات الشخصية', location: 'مكان الإقامة', preferences: 'تفضيلات العمل', career: 'الملف المهني', attachments: 'ملفات تدعم ترشيحك',
    firstName: 'الاسم الأول', lastName: 'الاسم الأخير', phone: 'رقم الجوال', email: 'البريد الإلكتروني المسجل',
    country: 'الدولة', region: 'المنطقة', city: 'المدينة', years: 'سنوات الخبرة', salary: 'الراتب المستهدف (ريال)',
    work: 'نمط العمل المناسب', remote: 'عن بُعد', part: 'دوام جزئي', full: 'دوام كامل', collaborator: 'متعاون', onsite: 'دوام كلي (حضوري)',
    letterLanguage: 'لغة الخطاب الموجّه', arabic: 'العربية', english: 'الإنجليزية', both: 'حسب لغة الوظيفة',
    skills: 'المهارات الأساسية', skillsHint: 'مثال: AutoCAD، إدارة المشاريع، Excel، اللغة الإنجليزية', summary: 'مختصر السيرة الذاتية', summaryHint: 'اكتب نبذة قصيرة عن خبرتك وأهم إنجازاتك وتخصصك.',
    filesHint: 'أضف الشهادات، خطابات الخبرة، نماذج الأعمال أو أي ملفات تدعم ترشيحك. PDF أو Word أو صور — حتى 10 ميجابايت للملف.',
    chooseFiles: 'إضافة ملفات داعمة', noFiles: 'لم تتم إضافة ملفات بعد', save: 'الحفظ والتحليل', close: 'إغلاق',
    saved: 'تم حفظ ملفك وتحليله على هذا الجهاز.', score: 'اكتمال الملف', strong: 'ملف قوي وجاهز للترشيح', improve: 'يمكن تحسين فرصك بإكمال البيانات الناقصة', missing: 'ينقصك: ',
    remove: 'حذف', localNote: 'في النسخة الحالية تُحفظ البيانات والملفات على جهازك فقط. سننقلها إلى قاعدة البيانات المشفرة في المرحلة المخصصة لذلك.', profile: 'ملفي'
  };
  const en = {
    title: 'My professional profile', subtitle: 'More accurate data means better job matches and application letters.',
    personal: 'Personal information', location: 'Location', preferences: 'Work preferences', career: 'Professional profile', attachments: 'Supporting documents',
    firstName: 'First name', lastName: 'Last name', phone: 'Mobile number', email: 'Registered email', country: 'Country', region: 'Region', city: 'City', years: 'Years of experience', salary: 'Target salary (SAR)',
    work: 'Preferred work type', remote: 'Remote', part: 'Part-time', full: 'Full-time', collaborator: 'Contract / collaborator', onsite: 'Full-time (on-site)',
    letterLanguage: 'Application letter language', arabic: 'Arabic', english: 'English', both: 'Match the job language', skills: 'Core skills', skillsHint: 'Example: AutoCAD, project management, Excel, English',
    summary: 'Professional summary', summaryHint: 'Briefly describe your experience, specialization and key achievements.', filesHint: 'Add certificates, experience letters, work samples or other supporting files. PDF, Word or images — up to 10 MB each.',
    chooseFiles: 'Add supporting files', noFiles: 'No files added yet', save: 'Save and analyze', close: 'Close', saved: 'Your profile was saved and analyzed on this device.',
    score: 'Profile completion', strong: 'Strong profile, ready for matching', improve: 'Complete the missing details to improve your chances', missing: 'Missing: ', remove: 'Remove',
    localNote: 'In this version, your information and files are stored only on this device. They will move to an encrypted database in the database phase.', profile: 'Profile'
  };

  function isEnglish() { return (document.documentElement.lang || '').toLowerCase().startsWith('en'); }
  function t() { return isEnglish() ? en : ar; }
  function esc(value) { return String(value || '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function countries() {
    const names = isEnglish() ? ['Saudi Arabia','United Arab Emirates','Qatar','Kuwait','Bahrain','Oman','Egypt','Jordan','Other'] : ['السعودية','الإمارات','قطر','الكويت','البحرين','عُمان','مصر','الأردن','أخرى'];
    return names.map(x => `<option value="${esc(x)}">${esc(x)}</option>`).join('');
  }

  function injectStyles() {
    if (document.getElementById('masar-profile-style')) return;
    const style = document.createElement('style');
    style.id = 'masar-profile-style';
    style.textContent = `
      .mp-open{position:fixed;z-index:8999;left:18px;bottom:82px;border:0;border-radius:999px;padding:11px 17px;background:#0f766e;color:#fff;font:700 14px/1.3 inherit;box-shadow:0 8px 24px #0f172a30;cursor:pointer}.mp-shell{position:fixed;inset:0;z-index:10000;background:#f6f8f7;overflow:auto;color:#17322f;display:none}.mp-shell.open{display:block}.mp-wrap{max-width:1000px;margin:auto;padding:22px 18px 80px}.mp-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:20px}.mp-head h1{margin:0 0 7px;font-size:clamp(25px,4vw,38px)}.mp-head p{margin:0;color:#60706e}.mp-close{border:1px solid #ccd8d6;background:#fff;color:#17322f;border-radius:12px;padding:10px 15px;cursor:pointer;font:700 14px inherit}.mp-card{background:#fff;border:1px solid #dce5e3;border-radius:20px;padding:20px;margin:14px 0;box-shadow:0 8px 30px #163b3410}.mp-card h2{font-size:18px;margin:0 0 16px}.mp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}.mp-field{display:flex;flex-direction:column;gap:7px}.mp-field.wide{grid-column:1/-1}.mp-field label,.mp-label{font-weight:700;font-size:14px}.mp-field input,.mp-field select,.mp-field textarea{width:100%;box-sizing:border-box;border:1px solid #cbd8d5;border-radius:12px;background:#fff;padding:12px 13px;font:inherit;color:#17322f}.mp-field textarea{min-height:112px;resize:vertical}.mp-checks{display:flex;gap:9px;flex-wrap:wrap}.mp-check{display:flex;align-items:center;gap:7px;border:1px solid #cad8d5;border-radius:999px;padding:10px 13px;cursor:pointer;background:#fbfdfc}.mp-check:has(input:checked){border-color:#0f766e;background:#e8f6f3;color:#095d57}.mp-check input{accent-color:#0f766e}.mp-upload{border:1.5px dashed #8cb9b2;border-radius:16px;padding:18px;background:#f5fbfa}.mp-upload p{color:#60706e;margin:0 0 13px;line-height:1.7}.mp-upload input{display:none}.mp-file-btn{display:inline-block;background:#e1f3ef;color:#0c675f;border-radius:11px;padding:10px 14px;font-weight:800;cursor:pointer}.mp-files{display:grid;gap:8px;margin-top:13px}.mp-file{display:flex;align-items:center;justify-content:space-between;gap:10px;background:#fff;border:1px solid #dce7e4;border-radius:11px;padding:10px 12px}.mp-file small{color:#6b7d7a}.mp-file button{border:0;background:#fff0ef;color:#b42318;border-radius:8px;padding:7px 9px;cursor:pointer}.mp-note{font-size:13px;color:#657572;background:#f1f5f4;border-radius:11px;padding:11px 13px;margin-top:13px}.mp-actions{position:sticky;bottom:10px;display:flex;align-items:center;gap:13px;background:#ffffffed;border:1px solid #d7e2df;border-radius:17px;padding:12px;box-shadow:0 10px 35px #17322f26;backdrop-filter:blur(10px)}.mp-save{border:0;border-radius:12px;background:#e6a63d;color:#1f2c2a;padding:13px 20px;font:800 15px inherit;cursor:pointer}.mp-result{flex:1;min-width:0}.mp-meter{height:9px;border-radius:99px;background:#e2e9e7;overflow:hidden;margin-top:6px}.mp-meter i{display:block;height:100%;width:0;background:#0f766e;border-radius:inherit;transition:.4s}.mp-toast{position:fixed;z-index:11000;bottom:24px;right:50%;transform:translateX(50%);background:#17322f;color:white;padding:12px 17px;border-radius:12px;box-shadow:0 10px 25px #0003}.mp-hidden{display:none!important}@media(max-width:650px){.mp-grid{grid-template-columns:1fr}.mp-field.wide{grid-column:auto}.mp-wrap{padding:17px 12px 70px}.mp-card{padding:16px;border-radius:16px}.mp-open{left:12px;bottom:74px}.mp-actions{align-items:stretch;flex-direction:column}.mp-save{width:100%}}
    `;
    document.head.appendChild(style);
  }

  function markup() {
    const x=t();
    return `<div class="mp-wrap"><header class="mp-head"><div><h1>${x.title}</h1><p>${x.subtitle}</p></div><button class="mp-close" type="button">${x.close}</button></header>
      <form id="mp-form"><section class="mp-card"><h2>${x.personal}</h2><div class="mp-grid">
        ${field('firstName',x.firstName,'text','given-name')}${field('lastName',x.lastName,'text','family-name')}${field('phone',x.phone,'tel','tel')}${field('email',x.email,'email','email')}
      </div></section><section class="mp-card"><h2>${x.location}</h2><div class="mp-grid">
        <div class="mp-field"><label for="mp-country">${x.country}</label><select id="mp-country" name="country"><option value=""></option>${countries()}</select></div>${field('region',x.region)}${field('city',x.city)}
      </div></section><section class="mp-card"><h2>${x.preferences}</h2><div class="mp-grid">${field('years',x.years,'number')}${field('salary',x.salary,'number')}
        <div class="mp-field wide"><span class="mp-label">${x.work}</span><div class="mp-checks">${check('remote',x.remote)}${check('part',x.part)}${check('full',x.full)}${check('collaborator',x.collaborator)}${check('onsite',x.onsite)}</div></div>
        <div class="mp-field wide"><label for="mp-letterLanguage">${x.letterLanguage}</label><select id="mp-letterLanguage" name="letterLanguage"><option value="auto">${x.both}</option><option value="ar">${x.arabic}</option><option value="en">${x.english}</option></select></div>
      </div></section><section class="mp-card"><h2>${x.career}</h2><div class="mp-grid">
        <div class="mp-field wide"><label for="mp-skills">${x.skills}</label><textarea id="mp-skills" name="skills" placeholder="${x.skillsHint}"></textarea></div>
        <div class="mp-field wide"><label for="mp-summary">${x.summary}</label><textarea id="mp-summary" name="summary" placeholder="${x.summaryHint}"></textarea></div>
      </div></section><section class="mp-card"><h2>${x.attachments}</h2><div class="mp-upload"><p>${x.filesHint}</p><label class="mp-file-btn" for="mp-file-input">＋ ${x.chooseFiles}</label><input id="mp-file-input" type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"><div class="mp-files" id="mp-files"></div></div><div class="mp-note">🔒 ${x.localNote}</div></section>
      <div class="mp-actions"><button class="mp-save" type="submit">${x.save}</button><div class="mp-result"><strong id="mp-score-label">${x.score}: 0%</strong><div id="mp-advice"></div><div class="mp-meter"><i id="mp-meter"></i></div></div></div></form></div>`;
  }
  function field(name,label,type='text',autocomplete='') { return `<div class="mp-field"><label for="mp-${name}">${label}</label><input id="mp-${name}" name="${name}" type="${type}" ${autocomplete?`autocomplete="${autocomplete}"`:''} ${type==='number'?'min="0" inputmode="numeric"':''}></div>`; }
  function check(value,label) { return `<label class="mp-check"><input type="checkbox" name="workTypes" value="${value}"><span>${label}</span></label>`; }

  function openDb() {
    return new Promise((resolve,reject)=>{ const req=indexedDB.open(FILE_DB,1); req.onupgradeneeded=()=>req.result.createObjectStore(FILE_STORE,{keyPath:'id'}); req.onsuccess=()=>resolve(req.result); req.onerror=()=>reject(req.error); });
  }
  async function putFiles(files) {
    const db=await openDb(); const tx=db.transaction(FILE_STORE,'readwrite'); const store=tx.objectStore(FILE_STORE);
    for(const file of files){ if(file.size>10*1024*1024) continue; const item={id:(crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random()),name:file.name,size:file.size,type:file.type,addedAt:new Date().toISOString(),blob:file}; store.put(item); savedFiles.push({id:item.id,name:item.name,size:item.size,type:item.type}); }
    await new Promise((res,rej)=>{tx.oncomplete=res;tx.onerror=()=>rej(tx.error)}); renderFiles();
  }
  async function deleteFile(id){ const db=await openDb(); const tx=db.transaction(FILE_STORE,'readwrite'); tx.objectStore(FILE_STORE).delete(id); savedFiles=savedFiles.filter(f=>f.id!==id); renderFiles(); save(false); }
  function renderFiles(){ const box=document.getElementById('mp-files'); if(!box)return; const x=t(); box.innerHTML=savedFiles.length?savedFiles.map(f=>`<div class="mp-file"><span>📎 ${esc(f.name)} <small>(${(f.size/1024/1024).toFixed(1)} MB)</small></span><button type="button" data-remove-file="${f.id}">${x.remove}</button></div>`).join(''):`<small>${x.noFiles}</small>`; }
  function readProfile(){ try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')}catch{return{}} }
  function fill(){ const data=readProfile(); const form=document.getElementById('mp-form'); Object.entries(data).forEach(([k,v])=>{ if(k==='workTypes'||k==='files')return; const el=form.elements[k]; if(el)el.value=v??''; }); (data.workTypes||[]).forEach(v=>{const el=form.querySelector(`[name="workTypes"][value="${CSS.escape(v)}"]`);if(el)el.checked=true}); savedFiles=data.files||[]; renderFiles(); analyze(data,false); }
  function collect(){ const form=document.getElementById('mp-form'); const fd=new FormData(form); return {firstName:fd.get('firstName'),lastName:fd.get('lastName'),phone:fd.get('phone'),email:fd.get('email'),country:fd.get('country'),region:fd.get('region'),city:fd.get('city'),years:fd.get('years'),salary:fd.get('salary'),workTypes:fd.getAll('workTypes'),letterLanguage:fd.get('letterLanguage'),skills:fd.get('skills'),summary:fd.get('summary'),files:savedFiles,updatedAt:new Date().toISOString()}; }
  function analyze(data,showToast=true){ const x=t(); const checks=[[data.firstName,x.firstName],[data.lastName,x.lastName],[data.phone,x.phone],[data.email,x.email],[data.country,x.country],[data.region,x.region],[data.city,x.city],[data.years,x.years],[data.salary,x.salary],[data.workTypes?.length,x.work],[data.skills?.trim().length>=8,x.skills],[data.summary?.trim().length>=30,x.summary],[data.files?.length,x.attachments]]; const missing=checks.filter(([ok])=>!ok).map(([,label])=>label); const score=Math.round((checks.length-missing.length)/checks.length*100); const label=document.getElementById('mp-score-label'); const advice=document.getElementById('mp-advice'); const meter=document.getElementById('mp-meter'); if(label)label.textContent=`${x.score}: ${score}%`; if(advice)advice.textContent=score>=85?x.strong:`${x.improve}${missing.length?' — '+x.missing+missing.slice(0,3).join('، '):''}`; if(meter)meter.style.width=score+'%'; if(showToast)toast(x.saved); return score; }
  function save(showToast=true){ const data=collect(); localStorage.setItem(STORAGE_KEY,JSON.stringify(data)); analyze(data,showToast); window.dispatchEvent(new CustomEvent('masar:profile-updated',{detail:data})); }
  function toast(message){ const el=document.createElement('div');el.className='mp-toast';el.textContent=message;document.body.appendChild(el);setTimeout(()=>el.remove(),2600); }
  function open(){ const shell=document.getElementById('masar-profile'); shell.innerHTML=markup(); shell.classList.add('open'); shell.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; bindInner(); fill(); }
  function close(){ const shell=document.getElementById('masar-profile');shell.classList.remove('open');shell.setAttribute('aria-hidden','true');document.body.style.overflow=''; }
  function bindInner(){ document.querySelector('.mp-close')?.addEventListener('click',close); document.getElementById('mp-form')?.addEventListener('submit',e=>{e.preventDefault();save(true)}); document.getElementById('mp-file-input')?.addEventListener('change',e=>putFiles([...e.target.files])); document.getElementById('mp-files')?.addEventListener('click',e=>{const b=e.target.closest('[data-remove-file]');if(b)deleteFile(b.dataset.removeFile)}); }
  function boot(){ injectStyles(); const shell=document.createElement('section');shell.id='masar-profile';shell.className='mp-shell';shell.setAttribute('aria-hidden','true');document.body.appendChild(shell); const button=document.createElement('button');button.type='button';button.className='mp-open';button.textContent='👤 '+t().profile;button.addEventListener('click',open);document.body.appendChild(button); document.addEventListener('click',e=>{const a=e.target.closest('button,a');if(!a||a===button||a.closest('#masar-profile'))return;const text=(a.textContent||'').trim().toLowerCase();if(text==='ملفي'||text==='الملف الشخصي'||text==='my profile'||text==='profile'){e.preventDefault();e.stopImmediatePropagation();open()}},true); new MutationObserver(()=>{button.textContent='👤 '+t().profile}).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']}); }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
