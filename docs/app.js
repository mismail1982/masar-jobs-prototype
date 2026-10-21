const defaultProfile={name:"أحمد محمد",role:"مهندس معماري",country:"السعودية",region:"منطقة الرياض",experience:7,salary:18000,cities:"الرياض، جدة، عن بُعد",skills:"التصميم المعماري، Revit، AutoCAD، BIM، إدارة المشروعات، التنسيق الهندسي",summary:"مهندس معماري بخبرة 7 سنوات في التصميم والإشراف والتنسيق بين التخصصات وإدارة المشروعات وتسليم الأعمال وفق الوقت والميزانية.",language:"ar"};
const keywordGroups={
 architecture:["معماري","معمارية","عمارة","هندسة معمارية","architect","architecture","architectural","revit","autocad","bim","تصميم معماري"],
 civil:["مدني","هندسة مدنية","civil","structural","إنشائي","انشائي","site engineer","مهندس موقع","construction"],
 mechanical:["ميكانيكا","ميكانيكي","mechanical","mep","hvac"],
 electrical:["كهرباء","كهربائي","electrical","power engineer"],
 engineering:["مهندس","مهندسة","هندسة","engineer","engineering"],
 projects:["مدير مشروعات","إدارة مشروعات","project manager","project management","pmp","planning engineer"]
};
const seedJobs=[
 {id:1,title:"مهندس معماري أول",company:"أفق العمران",country:"السعودية",region:"منطقة الرياض",location:"الرياض",mode:"هجين",minSalary:17000,maxSalary:21000,minExp:5,maxExp:9,category:"architecture",age:"منذ 18 دقيقة",skills:["Revit","AutoCAD","BIM","التنسيق الهندسي"],description:"إعداد ومراجعة التصاميم المعمارية والتنسيق مع فرق الإنشاء وMEP ومتابعة التنفيذ وفق المخططات والمواصفات."},
 {id:2,title:"Architectural Engineer",company:"روافد الهندسية",country:"السعودية",region:"منطقة مكة المكرمة",location:"جدة",mode:"حضوري",minSalary:16000,maxSalary:20000,minExp:4,maxExp:8,category:"architecture",age:"منذ ساعة",skills:["Architectural Design","Revit","Site Supervision"],description:"Develop architectural drawings, review design packages and coordinate with multidisciplinary teams."},
 {id:3,title:"مهندس مدني — إدارة مواقع",company:"مدار للمقاولات",country:"السعودية",region:"منطقة الرياض",location:"الرياض",mode:"حضوري",minSalary:15000,maxSalary:19000,minExp:5,maxExp:8,category:"civil",age:"منذ 3 ساعات",skills:["إدارة الموقع","التنفيذ","AutoCAD"],description:"الإشراف على التنفيذ بالموقع والتنسيق مع المقاولين وضبط الجودة والبرنامج الزمني."},
 {id:4,title:"مهندس تخطيط مشروعات",company:"نواة للبناء",country:"السعودية",region:"المنطقة الشرقية",location:"الدمام",mode:"هجين",minSalary:18000,maxSalary:23000,minExp:6,maxExp:10,category:"projects",age:"اليوم",skills:["Primavera P6","التخطيط","إدارة المشروعات"],description:"إعداد البرامج الزمنية ومتابعة التقدم وإدارة التغيير وإصدار تقارير المشروعات."},
 {id:5,title:"BIM Architect",company:"Gulf Design Lab",country:"السعودية",region:"منطقة الرياض",location:"عن بُعد",mode:"عن بُعد",minSalary:19000,maxSalary:23000,minExp:5,maxExp:9,category:"architecture",age:"اليوم",skills:["BIM","Revit","Navisworks"],description:"Lead BIM architectural modeling, clash coordination and multidisciplinary design delivery."},
 {id:6,title:"مهندس ميكانيكا MEP",company:"ابتكار الخليج",country:"السعودية",region:"منطقة الرياض",location:"الرياض",mode:"حضوري",minSalary:16000,maxSalary:19500,minExp:4,maxExp:7,category:"mechanical",age:"أمس",skills:["MEP","HVAC","إشراف"],description:"تصميم ومراجعة أنظمة MEP والتنسيق مع فرق العمارة والإنشاء والإشراف على التنفيذ."},
 {id:7,title:"مدير تصميم معماري",company:"مساحات",country:"الإمارات",region:"دبي",location:"دبي",mode:"هجين",minSalary:24000,maxSalary:30000,minExp:10,maxExp:15,category:"architecture",age:"أمس",skills:["Design Management","Architecture","Leadership"],description:"قيادة فريق التصميم المعماري وإدارة الاستشاريين وتسليم مشاريع متعددة الاستخدامات."}
];
let profile={...defaultProfile,...JSON.parse(localStorage.getItem("masarProfile")||"{}")};
const sourceCycle=["Telegram","موقع الشركة","Bayt","LinkedIn","Telegram","موقع توظيف","Facebook"];
seedJobs.forEach((job,index)=>{job.source=sourceCycle[index];job.salaryDisclosed=index!==2&&index!==6});
const storedJobs=JSON.parse(localStorage.getItem("masarCustomJobs")||"[]").filter(j=>j.minSalary&&j.maxSalary&&j.minExp!==undefined);
let jobs=[...seedJobs,...storedJobs];
let applications=JSON.parse(localStorage.getItem("masarApplications")||"[]");
const defaultSources=[
 {id:1,type:"telegram",name:"وظائف الهندسة — السعودية",country:"السعودية",sector:"هندسة وعمارة",status:"جاهز للربط",icon:"✈"},
 {id:2,type:"telegram",name:"Gulf Engineering Jobs",country:"كل دول الخليج",sector:"هندسة",status:"جاهز للربط",icon:"✈"},
 {id:3,type:"portal",name:"Bayt",country:"كل دول الخليج",sector:"كل المجالات",status:"تنبيهات وروابط",icon:"ب"},
 {id:4,type:"linkedin",name:"LinkedIn Jobs",country:"كل دول الخليج",sector:"كل المجالات",status:"تنبيهات رسمية",icon:"in"},
 {id:5,type:"facebook",name:"صفحات وظائف موثقة",country:"السعودية",sector:"كل المجالات",status:"يتطلب تصريح API",icon:"f"},
 {id:6,type:"company",name:"صفحات الشركات",country:"السعودية",sector:"هندسة وتقنية",status:"صفحات عامة مسموحة",icon:"⌂"}
];
let sources=JSON.parse(localStorage.getItem('masarSources')||'null')||defaultSources;
const countryLibrary=[
 {name:'السعودية',flag:'🇸🇦',bayt:'saudi-arabia',tanqeeb:'saudi',gulf:'saudi-arabia',sites:[['جدارات','https://jadarat.sa/'],['Bayt','https://www.bayt.com/en/saudi-arabia/jobs/'],['تنقيب','https://saudi.tanqeeb.com/ar'],['GulfTalent','https://www.gulftalent.com/saudi-arabia/jobs'],['Naukrigulf','https://www.naukrigulf.com/jobs-in-saudi-arabia']]},
 {name:'الإمارات',flag:'🇦🇪',bayt:'uae',tanqeeb:'uae',gulf:'uae',sites:[['بوابة الوظائف الحكومية','https://u.ae/en/resources/government-jobs'],['Bayt','https://www.bayt.com/en/uae/jobs/'],['تنقيب','https://uae.tanqeeb.com/ar'],['GulfTalent','https://www.gulftalent.com/uae/jobs'],['Naukrigulf','https://www.naukrigulf.com/jobs-in-uae']]},
 {name:'قطر',flag:'🇶🇦',bayt:'qatar',tanqeeb:'qatar',gulf:'qatar',sites:[['كوادر','https://www.adlsa.gov.qa/'],['Bayt','https://www.bayt.com/en/qatar/jobs/'],['تنقيب','https://qatar.tanqeeb.com/ar'],['GulfTalent','https://www.gulftalent.com/qatar/jobs'],['Naukrigulf','https://www.naukrigulf.com/jobs-in-qatar']]},
 {name:'الكويت',flag:'🇰🇼',bayt:'kuwait',tanqeeb:'kuwait',gulf:'kuwait',sites:[['التوظيف الحكومي','https://www.e.gov.kw/sites/kgoArabic/Pages/CitizensResidents/InfoSubPages/Employment.aspx'],['Bayt','https://www.bayt.com/en/kuwait/jobs/'],['تنقيب','https://kuwait.tanqeeb.com/ar'],['GulfTalent','https://www.gulftalent.com/kuwait/jobs'],['Naukrigulf','https://www.naukrigulf.com/jobs-in-kuwait']]},
 {name:'البحرين',flag:'🇧🇭',bayt:'bahrain',tanqeeb:'bahrain',gulf:'bahrain',sites:[['البوابة الوطنية','https://www.bahrain.bh/wps/portal/en/BNP/HomeNationalPortal'],['معرض وزارة العمل','https://jobs.mlsd.gov.bh/'],['Bayt','https://www.bayt.com/en/bahrain/jobs/'],['تنقيب','https://bahrain.tanqeeb.com/ar'],['GulfTalent','https://www.gulftalent.com/bahrain/jobs']]},
 {name:'عُمان',flag:'🇴🇲',bayt:'oman',tanqeeb:'oman',gulf:'oman',sites:[['وظائف حكومية Gov.om','https://gov.om/en/w/apply-for-vacant-government-positions'],['وزارة العمل','https://jobs.mol.gov.om/jobs/default.aspx'],['Bayt','https://www.bayt.com/en/oman/jobs/'],['تنقيب','https://oman.tanqeeb.com/ar'],['GulfTalent','https://www.gulftalent.com/oman/jobs']]},
 {name:'مصر',flag:'🇪🇬',bayt:'egypt',tanqeeb:'egypt',gulf:'egypt',sites:[['WUZZUF','https://wuzzuf.net/jobs/egypt'],['فرصنا','https://forasna.com/'],['Bayt','https://www.bayt.com/en/egypt/jobs/'],['تنقيب','https://egypt.tanqeeb.com/ar'],['GulfTalent','https://www.gulftalent.com/egypt/jobs']]},
 {name:'الأردن',flag:'🇯🇴',bayt:'jordan',tanqeeb:'jordan',gulf:'jordan',sites:[['سجّل — المنصة الوطنية','https://www.sajjil.gov.jo/'],['أخطبوط','https://jobs.akhtaboot.com/ar/jordan'],['Bayt','https://www.bayt.com/en/jordan/jobs/'],['تنقيب','https://jordan.tanqeeb.com/ar']]},
 {name:'لبنان',flag:'🇱🇧',bayt:'lebanon',tanqeeb:'lebanon',gulf:'lebanon',sites:[['Bayt','https://www.bayt.com/en/lebanon/jobs/'],['تنقيب','https://lebanon.tanqeeb.com/ar'],['Daleel Madani','https://daleel-madani.org/civil-society-directory/jobs']]},
 {name:'العراق',flag:'🇮🇶',bayt:'iraq',tanqeeb:'iraq',gulf:'iraq',sites:[['Bayt','https://www.bayt.com/en/iraq/jobs/'],['تنقيب','https://iraq.tanqeeb.com/ar'],['GulfTalent','https://www.gulftalent.com/iraq/jobs']]},
 {name:'المغرب',flag:'🇲🇦',bayt:'morocco',tanqeeb:'morocco',gulf:'morocco',sites:[['ReKrute','https://www.rekrute.com/'],['Emploi.ma','https://www.emploi.ma/'],['Bayt','https://www.bayt.com/en/morocco/jobs/'],['تنقيب','https://morocco.tanqeeb.com/ar']]},
 {name:'تونس',flag:'🇹🇳',bayt:'tunisia',tanqeeb:'tunisia',gulf:'tunisia',sites:[['Tanitjobs','https://www.tanitjobs.com/jobs/'],['Keejob','https://www.keejob.com/'],['Bayt','https://www.bayt.com/en/tunisia/jobs/'],['تنقيب','https://tunisia.tanqeeb.com/ar']]},
 {name:'الجزائر',flag:'🇩🇿',bayt:'algeria',tanqeeb:'algeria',gulf:'algeria',sites:[['Emploitic','https://emploitic.com/'],['Bayt','https://www.bayt.com/en/algeria/jobs/'],['تنقيب','https://algeria.tanqeeb.com/ar']]}
];
const specialtyLibrary=[
 {icon:'⌂',name:'الهندسة والعمارة',children:['هندسة معمارية','هندسة مدنية','هندسة إنشائية','هندسة ميكانيكية','هندسة كهربائية','هندسة صناعية','هندسة كيميائية','هندسة بترول','MEP','BIM','تخطيط مشروعات','مساحة وكميات','QA/QC','HSE'],keywords:['مهندس','معماري','عمارة','مدني','إنشائي','ميكانيكا','كهرباء','Revit','AutoCAD','BIM','Site Engineer','Planning Engineer']},
 {icon:'⌘',name:'التقنية والبيانات',children:['تطوير برمجيات','تطبيقات موبايل','تطوير ويب','تحليل بيانات','علم بيانات','ذكاء اصطناعي','أمن سيبراني','Cloud','DevOps','شبكات','SAP وERP','دعم فني','UI/UX'],keywords:['Software Engineer','مبرمج','Data Analyst','Data Scientist','AI','Cybersecurity','Cloud','DevOps','Network','SAP','Product Manager']},
 {icon:'✚',name:'الطب والرعاية الصحية',children:['طب بشري','تمريض','صيدلة','أسنان','مختبرات','أشعة','علاج طبيعي','تغذية','صحة عامة','أجهزة طبية'],keywords:['طبيب','ممرض','صيدلي','Dentist','Laboratory','Radiology','Physiotherapy','Nutrition','Biomedical']},
 {icon:'﷼',name:'المالية والمحاسبة',children:['محاسبة','مراجعة','تحليل مالي','FP&A','خزينة','ضرائب','بنوك','استثمار','تأمين','مخاطر','امتثال مالي'],keywords:['محاسب','مدقق','Financial Analyst','Auditor','Treasury','Tax','Banking','Investment','Insurance','Risk']},
 {icon:'↗',name:'المبيعات والتسويق',children:['مبيعات','تطوير أعمال','إدارة حسابات','تسويق رقمي','SEO','محتوى','سوشيال ميديا','علامة تجارية','أبحاث سوق','تجارة إلكترونية'],keywords:['Sales','Business Development','Account Manager','Marketing','SEO','Content','Social Media','Brand','E-commerce']},
 {icon:'♙',name:'الموارد البشرية والإدارة',children:['موارد بشرية','استقطاب','رواتب','تعلم وتطوير','تطوير تنظيمي','إدارة مكتبية','سكرتارية','علاقات حكومية'],keywords:['HR','Recruitment','Talent Acquisition','Payroll','L&D','Office Manager','Admin','Secretary','Government Relations']},
 {icon:'⇄',name:'العمليات وسلاسل الإمداد',children:['عمليات','مشتريات','لوجستيات','سلسلة إمداد','مخازن','مخزون','تخطيط طلب','جودة تشغيلية'],keywords:['Operations','Procurement','Logistics','Supply Chain','Warehouse','Inventory','Demand Planning']},
 {icon:'✓',name:'إدارة المشروعات والمنتجات',children:['Project Management','PMO','Program Management','Product Management','Agile وScrum','عقود','تخطيط ومتابعة'],keywords:['مدير مشروعات','Project Manager','PMO','Program Manager','Product Manager','Scrum Master','PMP','Contracts']},
 {icon:'▤',name:'التعليم والتدريب',children:['تدريس','تعليم جامعي','تدريب مهني','إدارة تعليمية','تربية خاصة','تعليم إلكتروني','ترجمة'],keywords:['معلم','Teacher','Lecturer','Trainer','Academic','Special Education','E-learning','Translator']},
 {icon:'⚖',name:'القانون والحوكمة',children:['محاماة','استشارات قانونية','عقود','تحقيقات','حوكمة','امتثال','سكرتارية مجالس'],keywords:['محامي','Lawyer','Legal Counsel','Paralegal','Contracts','Compliance','Governance']},
 {icon:'★',name:'الضيافة والسياحة والطيران',children:['فنادق','مطاعم','طهاة','أغذية ومشروبات','استقبال','إشراف داخلي','سفر وسياحة','طيران'],keywords:['Hotel','Hospitality','Chef','F&B','Front Office','Housekeeping','Travel','Cabin Crew','Aviation']},
 {icon:'⚒',name:'الحرف والإنشاءات',children:['كهربائي','سباك','لحام','نجارة','تبريد وتكييف','فني صيانة','مشرف موقع','مسّاح','معدات ثقيلة'],keywords:['Electrician','Plumber','Welder','Carpenter','HVAC','Technician','Foreman','Surveyor','Crane Operator']},
 {icon:'◉',name:'الطاقة والنفط والغاز',children:['نفط وغاز','حفر','عمليات إنتاج','طاقة متجددة','طاقة شمسية','مرافق','معالجة مياه'],keywords:['Oil and Gas','Petroleum','Drilling','Process Engineer','Renewable Energy','Solar','Utilities','Water Treatment']},
 {icon:'⚙',name:'التصنيع والصناعة',children:['إنتاج','صيانة','أتمتة','مصانع غذائية','ضبط جودة','سيارات','معادن','تعبئة وتغليف'],keywords:['Production','Manufacturing','Maintenance','Automation','Quality Control','Automotive','CNC','Packaging']},
 {icon:'✦',name:'الإعلام والتصميم',children:['تصميم جرافيك','تصميم داخلي','مونتاج','تصوير','كتابة محتوى','علاقات عامة','إعلان'],keywords:['Graphic Designer','Interior Designer','Video Editor','Photographer','Copywriter','PR','Advertising']},
 {icon:'☏',name:'خدمة العملاء والتجزئة',children:['خدمة عملاء','Call Center','Customer Success','مبيعات تجزئة','كاشير','إدارة متجر'],keywords:['Customer Service','Call Center','Customer Success','Retail','Cashier','Store Manager']},
 {icon:'♧',name:'الزراعة والبيئة',children:['زراعة','إنتاج حيواني','غابات','بيئة','استدامة','ESG','إدارة نفايات'],keywords:['Agriculture','Agricultural Engineer','Environment','Sustainability','ESG','Waste Management']},
 {icon:'◇',name:'الأمن والسلامة',children:['أمن','سلامة وصحة مهنية','مكافحة حريق','أمن صناعي','إدارة مخاطر'],keywords:['Security','Safety','HSE','Fire Fighting','Industrial Safety','Risk Management']}
];
let selectedJob=null,currentCompose="email",activeFilter="all",activeKeyword="";
let applicationMode=localStorage.getItem('masarApplicationMode')||'approval';
let autoApplyConsent=localStorage.getItem('masarAutoApplyConsent')==='true';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

const telegramApp=window.Telegram?.WebApp;
if(telegramApp){
 telegramApp.ready();
 telegramApp.expand();
 telegramApp.setHeaderColor?.('#0c2f2d');
 telegramApp.setBackgroundColor?.('#f4f7f5');
 document.documentElement.dataset.telegram='true';
 const tgUser=telegramApp.initDataUnsafe?.user;
 const signupName=document.querySelector('#registerForm [name="name"]');
 if(tgUser&&signupName&&!signupName.value)signupName.value=[tgUser.first_name,tgUser.last_name].filter(Boolean).join(' ');
}

let pendingUser=null,demoOtp="";
function startAuth(){const user=JSON.parse(localStorage.getItem("masarUser")||"null");if(user?.verified){$('#authScreen').classList.add('hidden');profile={...profile,name:user.name,country:user.country};fillProfile()}else $('#authScreen').classList.remove('hidden')}
$('#signupCountry').addEventListener('change',e=>{$('#phoneCode').textContent=e.target.selectedOptions[0]?.dataset.code||'+---'});
$('#registerForm').addEventListener('submit',e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget).entries());pendingUser=data;demoOtp=String(Math.floor(100000+Math.random()*900000));$('#maskedPhone').textContent=`${$('#phoneCode').textContent} •••• ${data.phone.slice(-4)}`;$('#activationEmail').textContent=data.email;$('#demoOtp').textContent=demoOtp;$('#registerForm').classList.add('hidden');$('#otpForm').classList.remove('hidden');$$('.otp-inputs input')[0].focus()});
$$('.otp-inputs input').forEach((input,i)=>{input.addEventListener('input',()=>{input.value=input.value.replace(/\D/g,'').slice(0,1);if(input.value&&i<5)$$('.otp-inputs input')[i+1].focus()});input.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!input.value&&i>0)$$('.otp-inputs input')[i-1].focus()})});
$('#otpForm').addEventListener('submit',e=>{e.preventDefault();const entered=$$('.otp-inputs input').map(x=>x.value).join('');if(entered!==demoOtp)return toast('رمز التحقق غير صحيح');if(!$('#emailActivated').checked)return toast('فعّل البريد الإلكتروني أولًا');const user={...pendingUser,verified:true};delete user.privacy;localStorage.setItem('masarUser',JSON.stringify(user));profile={...profile,name:user.name,country:user.country};localStorage.setItem('masarProfile',JSON.stringify(profile));$('#authScreen').classList.add('hidden');fillProfile();renderJobs();toast('تم تفعيل الحساب بنجاح')});
$('#backToRegister').addEventListener('click',()=>{$('#otpForm').classList.add('hidden');$('#registerForm').classList.remove('hidden')});
$('#showPrivacy').addEventListener('click',()=>$('#privacyDialog').classList.add('open'));
$('#closePrivacy').addEventListener('click',()=>$('#privacyDialog').classList.remove('open'));
$('#logoutBtn').addEventListener('click',()=>{localStorage.removeItem('masarUser');$('#registerForm').reset();$('#otpForm').classList.add('hidden');$('#registerForm').classList.remove('hidden');$('#authScreen').classList.remove('hidden')});

function initials(company){return company.trim().split(/\s+/).slice(0,2).map(x=>x[0]).join("");}
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2400)}
function escapeHtml(value){return String(value).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#039;",'"':"&quot;"}[c]));}
function switchSection(id){$$('.page').forEach(p=>p.classList.toggle('active',p.id===id));$$('.nav-item,.mobile-nav-item').forEach(n=>n.classList.toggle('active',n.dataset.section===id));const titles={dashboard:`صباح الخير، ${profile.name.split(' ')[0]} <span>👋</span>`,jobs:"الفرص المناسبة",applications:"طلبات التقديم",channels:"قنوات الوظائف",library:"مكتبة البحث",salary:"راتبي كام؟",profile:"ملفي المهني"};$('#pageTitle').innerHTML=titles[id]||"مسار";$('.sidebar').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'});}
$$('[data-section]').forEach(btn=>btn.addEventListener('click',()=>switchSection(btn.dataset.section)));
$('#menuBtn').addEventListener('click',()=>$('.sidebar').classList.toggle('open'));

function salaryText(job){return job.salaryDisclosed===false?'الراتب غير متاح':`${Number(job.minSalary).toLocaleString('ar-SA')}–${Number(job.maxSalary).toLocaleString('ar-SA')} ر.س`}
function matchDetails(job){const exp=Number(profile.experience),target=Number(profile.salary),salaryLow=target-2000,salaryHigh=target+2000;const experience=exp>=job.minExp&&exp<=job.maxExp;const city=profile.cities.includes(job.location)||profile.region.includes(job.region)||job.mode.includes('بُعد');const country=profile.country===job.country;const salaryDisclosed=job.salaryDisclosed!==false;const salary=!salaryDisclosed||job.maxSalary>=salaryLow&&job.minSalary<=salaryHigh;const available=salaryDisclosed?3:2,matched=[experience,city&&country].filter(Boolean).length+(salaryDisclosed&&salary?1:0);return {experience,city:city&&country,salary,salaryDisclosed,score:Math.round(matched/available*100)}}
function jobCard(job,compact=false){const m=matchDetails(job);return `<article class="job-card" data-job-id="${job.id}" role="button" tabindex="0" aria-label="عرض تفاصيل ${escapeHtml(job.title)}">
  <span class="company-logo">${escapeHtml(initials(job.company))}</span>
  <div class="job-main"><h4>${escapeHtml(job.title)} <small class="source-badge">${escapeHtml(job.source||'مصدر مباشر')}</small></h4><div class="job-meta"><span>${escapeHtml(job.company)}</span><span>•</span><span>${escapeHtml(job.country)} — ${escapeHtml(job.location)}</span><span>•</span><span>${escapeHtml(job.mode)}</span></div><div class="job-tags"><span class="tag ${m.salaryDisclosed?'':'undisclosed'}">${salaryText(job)}</span><span class="tag">خبرة ${job.minExp}–${job.maxExp} سنوات</span>${job.skills.slice(0,compact?1:2).map(s=>`<span class="tag">${escapeHtml(s)}</span>`).join('')}</div>${compact?'':`<div class="criteria-tags"><span class="${m.experience?'yes':'no'}">${m.experience?'✓':'×'} الخبرة</span><span class="${m.city?'yes':'no'}">${m.city?'✓':'×'} الموقع</span><span class="${m.salary?'yes':'no'}">${m.salaryDisclosed?(m.salary?'✓ الراتب ±2,000':'× الراتب خارج النطاق'):'◌ الراتب غير متاح — لا يمنع التقديم'}</span></div><div class="job-actions"><button class="apply-btn" data-apply="${job.id}">التقديم</button><button data-details="${job.id}">عرض التفاصيل</button></div>`}</div>
  <div class="match-badge"><span>${m.score}%</span><div class="match-bar"><i style="width:${m.score}%"></i></div></div>
</article>`}
function keywordCategories(query){const q=query.trim().toLowerCase();if(!q)return[];return Object.entries(keywordGroups).filter(([,words])=>words.some(w=>q.includes(w)||w.includes(q))).map(([key])=>key)}
function keywordMatch(job,query){if(!query)return true;const cats=keywordCategories(query);const text=[job.title,job.category,job.description,...job.skills].join(' ').toLowerCase();if(!cats.length)return text.includes(query.toLowerCase());if(cats.includes('engineering'))return ['architecture','civil','mechanical','electrical','engineering','projects'].includes(job.category);return cats.includes(job.category)||Object.entries(keywordGroups).some(([key,words])=>cats.includes(key)&&words.some(w=>text.includes(w)))}
function filteredJobs(){const q=(activeKeyword||$('#globalSearch').value).trim().toLowerCase();return jobs.filter(j=>activeFilter==='all'||(activeFilter==='experience'&&matchDetails(j).experience)||(activeFilter==='salary'&&matchDetails(j).salary)||(activeFilter==='remote'&&j.mode.includes('بُعد'))||(activeFilter==='riyadh'&&j.location==='الرياض')).filter(j=>keywordMatch(j,q)).sort((a,b)=>matchDetails(b).score-matchDetails(a).score)}
function renderJobs(){const list=filteredJobs();$('#jobsList').innerHTML=list.length?list.map(j=>jobCard(j)).join(''):`<div class="no-results">لم نجد وظائف مطابقة لهذه الكلمة حاليًا. جرّب مرادفًا مثل «معماري»، «عمارة»، «هندسة مدنية» أو «BIM».</div>`;$('#dashboardJobs').innerHTML=[...jobs].sort((a,b)=>matchDetails(b).score-matchDetails(a).score).slice(0,3).map(j=>jobCard(j,true)).join('');$('#navJobCount').textContent=list.length;$('#criteriaCountry').textContent=profile.country;$('#criteriaSalary').textContent=`${Number(profile.salary).toLocaleString('ar-SA')} ± 2,000 ر.س`;$('#criteriaExperience').textContent=`${profile.experience} سنوات`;bindJobActions();}
function bindJobActions(){
 $$('[data-apply]').forEach(button=>button.onclick=event=>{event.stopPropagation();requestApplication(Number(button.dataset.apply))});
 $$('[data-details]').forEach(button=>button.onclick=event=>{event.stopPropagation();openJobDetails(Number(button.dataset.details))});
 $$('.job-card').forEach(card=>{
  card.onclick=()=>openJobDetails(Number(card.dataset.jobId));
  card.onkeydown=event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openJobDetails(Number(card.dataset.jobId))}};
 });
}

function openJobDetails(id){
 const job=jobs.find(item=>item.id===id);if(!job)return;
 selectedJob=job;const match=matchDetails(job);
 $('#jobDetailsLogo').textContent=initials(job.company);
 $('#jobDetailsTitle').textContent=job.title;
 $('#jobDetailsCompany').textContent=`${job.company} · ${job.source||'مصدر مباشر'} · ${job.age||'حديثًا'}`;
 $('#jobDetailsFacts').innerHTML=`<div><small>الموقع</small><strong>${escapeHtml(job.country)} — ${escapeHtml(job.location)}</strong></div><div><small>نظام العمل</small><strong>${escapeHtml(job.mode)}</strong></div><div><small>الراتب</small><strong class="${match.salaryDisclosed?'':'salary-unavailable'}">${salaryText(job)}</strong></div><div><small>الخبرة المطلوبة</small><strong>${job.minExp}–${job.maxExp} سنوات</strong></div>`;
 $('#jobDetailsDescription').textContent=job.description||'لم يضف صاحب العمل وصفًا تفصيليًا لهذه الوظيفة.';
 $('#jobDetailsSkills').innerHTML=job.skills.map(skill=>`<span>${escapeHtml(skill)}</span>`).join('');
 $('#jobDetailsMatch').innerHTML=`<span class="${match.experience?'good':'warn'}">${match.experience?'✓':'!'} الخبرة</span><span class="${match.city?'good':'warn'}">${match.city?'✓':'!'} الموقع</span><span class="${match.salary?'good':'warn'}">${match.salaryDisclosed?(match.salary?'✓ الراتب مناسب':'! الراتب خارج النطاق'):'◌ الراتب غير متاح'}</span><span class="good">التوافق ${match.score}%</span>`;
 $('#detailsApplyBtn').dataset.applyJob=job.id;
 $('#jobDetailsModal').classList.add('open');$('#jobDetailsModal').setAttribute('aria-hidden','false');
}
function closeJobDetails(){$('#jobDetailsModal').classList.remove('open');$('#jobDetailsModal').setAttribute('aria-hidden','true')}
$$('[data-close-details]').forEach(button=>button.addEventListener('click',closeJobDetails));
$('#detailsApplyBtn').addEventListener('click',()=>{const id=Number($('#detailsApplyBtn').dataset.applyJob);closeJobDetails();requestApplication(id)});

$$('.filter').forEach(b=>b.addEventListener('click',()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');activeFilter=b.dataset.filter;renderJobs()}));
function runKeywordSearch(value){activeKeyword=value.trim();$('#keywordSearch').value=activeKeyword;if(activeKeyword)switchSection('jobs');renderJobs()}
$('#keywordSearchBtn').addEventListener('click',e=>{e.preventDefault();runKeywordSearch($('#keywordSearch').value)});
$('#keywordSearch').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();runKeywordSearch(e.target.value)}});
$$('[data-keyword]').forEach(b=>b.addEventListener('click',()=>runKeywordSearch(b.dataset.keyword)));
$('#globalSearch').addEventListener('input',()=>{activeKeyword='';if($('#globalSearch').value)switchSection('jobs');renderJobs()});

function profileSkills(){return profile.skills.split(/[،,]/).map(x=>x.trim()).filter(Boolean)}
function recalcScore(job){return matchDetails(job).score}
function renderApplicationMode(){
 const selected=$(`input[name="applicationMode"][value="${applicationMode}"]`);if(selected)selected.checked=true;
 $('#autoConsentWrap').classList.toggle('hidden',applicationMode!=='auto');
 $('#autoApplyConsent').checked=autoApplyConsent;
 const labels={manual:'تصفح يدوي',approval:'بموافقتي',auto:'تقديم تلقائي'};$('#applicationModeStatus').textContent=labels[applicationMode];
}
function addApplication(job,status,consent=true){
 if(applications.some(item=>item.jobId===job.id))return false;
 applications.unshift({jobId:job.id,title:job.title,company:job.company,score:matchDetails(job).score,date:new Date().toLocaleDateString('ar-SA'),status,draft:`طلب وظيفة ${job.title} في ${job.company} — تم تجهيز خطاب التقديم من ملف ${profile.name}.`,consent});
 localStorage.setItem('masarApplications',JSON.stringify(applications));return true;
}
function runAutoApply(){
 if(applicationMode!=='auto'||!autoApplyConsent)return 0;
 const eligible=jobs.filter(job=>matchDetails(job).score>50);let added=0;
 eligible.forEach(job=>{if(addApplication(job,'إرسال تلقائي — تجريبي',true))added++});
 renderApplications();return added;
}
function requestApplication(id){
 const job=jobs.find(item=>item.id===id);if(!job)return;
 if(applicationMode==='auto'&&autoApplyConsent){const added=addApplication(job,'إرسال تلقائي — تجريبي',true);renderApplications();switchSection('applications');toast(added?'تم تجهيز الطلب تلقائيًا — تجريبي':'سبق تجهيز طلب لهذه الوظيفة');return}
 openApplication(id,applicationMode==='manual');
}
$$('input[name="applicationMode"]').forEach(input=>input.addEventListener('change',()=>{$('#autoConsentWrap').classList.toggle('hidden',input.value!=='auto')}));
$('#saveApplicationMode').addEventListener('click',()=>{
 const selected=$('input[name="applicationMode"]:checked')?.value||'approval';
 if(selected==='auto'&&!$('#autoApplyConsent').checked)return toast('وافق أولًا على التفويض المسبق للتقديم التلقائي');
 applicationMode=selected;autoApplyConsent=selected==='auto'&&$('#autoApplyConsent').checked;
 localStorage.setItem('masarApplicationMode',applicationMode);localStorage.setItem('masarAutoApplyConsent',String(autoApplyConsent));renderApplicationMode();
 const count=runAutoApply();toast(applicationMode==='auto'?`تم تفعيل التقديم التلقائي وتجهيز ${count} طلب جديد تجريبيًا`:'تم حفظ طريقة التقديم');
});
function openApplication(id,skipDecision=false){selectedJob=jobs.find(j=>j.id===id);if(!selectedJob)return;currentCompose='email';const m=matchDetails(selectedJob);$('#selectedJob').innerHTML=`<strong>${escapeHtml(selectedJob.title)} — ${escapeHtml(selectedJob.company)}</strong><span>${escapeHtml(selectedJob.country)} · ${escapeHtml(selectedJob.location)} · ${salaryText(selectedJob)} · توافق الشروط ${m.score}%</span>`;$('#decisionStage').classList.toggle('hidden',skipDecision);$('#composeStage').classList.toggle('hidden',!skipDecision);$('#submitConsent').checked=false;$('#approveApplication').disabled=true;$$('[data-compose]').forEach(b=>b.classList.toggle('active',b.dataset.compose==='email'));updateComposer();$('#applicationModal').classList.add('open');$('#applicationModal').setAttribute('aria-hidden','false')}
function closeApplication(){$('#applicationModal').classList.remove('open');$('#applicationModal').setAttribute('aria-hidden','true')}
$$('[data-close-modal]').forEach(x=>x.addEventListener('click',closeApplication));
$('#declineApplication').addEventListener('click',()=>{closeApplication();toast('تم الاحتفاظ بالوظيفة دون تقديم')});
$('#acceptApplication').addEventListener('click',()=>{$('#decisionStage').classList.add('hidden');$('#composeStage').classList.remove('hidden')});
$('#submitConsent').addEventListener('change',e=>{$('#approveApplication').disabled=!e.target.checked});
$$('[data-compose]').forEach(btn=>btn.addEventListener('click',()=>{currentCompose=btn.dataset.compose;$$('[data-compose]').forEach(x=>x.classList.toggle('active',x===btn));updateComposer()}));
function texts(){const first=profile.name,skills=selectedJob.skills.slice(0,3).join('، '),summary=profile.summary.trim();return {
 email:`السادة/ فريق التوظيف في ${selectedJob.company}،\n\nتحية طيبة،\n\nأتقدم باهتمام لشغل وظيفة «${selectedJob.title}». أنا ${first}، ${summary}\n\nتتوافق خبرتي مع عدد من متطلبات الوظيفة، وبالأخص ${skills}. أرفق لكم سيرتي الذاتية، ويسعدني مناقشة كيف يمكن لخبرتي أن تسهم في أهداف فريقكم.\n\nمع خالص التحية،\n${first}`,
 letter:`السادة/ فريق التوظيف في ${selectedJob.company} المحترمين،\n\nأتقدم إليكم لشغل وظيفة «${selectedJob.title}»، لما أراه من توافق واضح بين متطلبات الدور وخبرتي المهنية.\n\n${summary}\n\nخلال مسيرتي طورت خبرة عملية في ${profileSkills().slice(0,5).join('، ')}. وأعتقد أن هذه الخبرات، إلى جانب قدرتي على التعلم والعمل مع الفرق المختلفة، ستمكنني من تقديم إضافة ملموسة إلى ${selectedJob.company}.\n\nأتطلع إلى فرصة للتعريف بخبرتي بصورة أكبر ومناقشة احتياجات هذا الدور. شكرًا لوقتكم واهتمامكم.\n\nمع خالص التقدير،\n${first}`,
 linkedin:`مرحبًا، أنا ${first}. لفتت انتباهي وظيفة «${selectedJob.title}» في ${selectedJob.company}. لدي خبرة في ${profileSkills().slice(0,3).join('، ')}، وأرى توافقًا جيدًا مع متطلبات الدور. تقدمت/أستعد للتقدم عبر القناة الرسمية، ويسعدني التواصل لمعرفة المزيد. شكرًا لوقتك.`};}
function updateComposer(){if(!selectedJob)return;const labels={email:'مقدمة بريد جاهزة للمراجعة',letter:'خطاب تقديم مخصص',linkedin:'رسالة LinkedIn قصيرة — للنسخ والمراجعة فقط'},m=matchDetails(selectedJob);$('#composeLabel').textContent=labels[currentCompose];$('#generatedText').value=texts()[currentCompose];$('#matchReasons').innerHTML=`<span class="${m.experience?'':'warn'}">${m.experience?'✓':'!'} خبرتك ${profile.experience} سنوات / المطلوب ${selectedJob.minExp}–${selectedJob.maxExp}</span><span class="${m.city?'':'warn'}">${m.city?'✓':'!'} ${selectedJob.location}</span><span class="${m.salary?'':'warn'}">${m.salaryDisclosed?(m.salary?'✓ راتبك المستهدف ±2,000':'! الراتب خارج النطاق'):'◌ الراتب غير معلن — التقديم متاح'}</span>`}
$('#copyText').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#generatedText').value);toast('تم نسخ النص')}catch{toast('حدد النص وانسخه يدويًا')}});
$('#approveApplication').addEventListener('click',()=>{if(!selectedJob||!$('#submitConsent').checked)return;const added=addApplication(selectedJob,'تم الإرسال — تجريبي',true);if(added)applications[0].draft=$('#generatedText').value;localStorage.setItem('masarApplications',JSON.stringify(applications));renderApplications();closeApplication();switchSection('applications');toast(added?'تم إرسال الطلب تجريبيًا بعد موافقتك':'سبق إرسال هذا الطلب')});
function renderApplications(){const body=$('#applicationsTable');body.innerHTML=applications.map(a=>`<tr><td><strong>${escapeHtml(a.title)}</strong></td><td>${escapeHtml(a.company)}</td><td>${a.score}%</td><td>${escapeHtml(a.date)}</td><td><span class="status-pill">${escapeHtml(a.status)}</span></td><td><button class="text-btn" data-review-app="${a.jobId}">مراجعة</button></td></tr>`).join('');$('#emptyApplications').classList.toggle('hidden',applications.length>0);$('#readyCount').textContent=applications.length;$('#mobileApplicationCount').textContent=applications.length;$$('[data-review-app]').forEach(b=>b.onclick=()=>openJobDetails(Number(b.dataset.reviewApp)))}

function fillProfile(){Object.entries(profile).forEach(([k,v])=>{const el=$(`#profileForm [name="${k}"]`);if(el)el.value=v});$('#sidebarName').textContent=profile.name;$('#sidebarCountry').textContent=`باحث عن فرصة · ${profile.country}`}
$('#profileForm').addEventListener('submit',e=>{e.preventDefault();profile=Object.fromEntries(new FormData(e.currentTarget).entries());profile.experience=Number(profile.experience);profile.salary=Number(profile.salary);localStorage.setItem('masarProfile',JSON.stringify(profile));renderJobs();fillProfile();switchSection('dashboard');toast('تم حفظ ملفك وإعادة تحليل الخبرة والموقع والراتب')});
$('#cvUpload').addEventListener('change',e=>{const file=e.target.files[0];if(!file)return;if(file.size>10*1024*1024){toast('حجم الملف أكبر من 10MB');e.target.value='';return}$('#fileInfo').classList.remove('hidden');$('#fileInfo').innerHTML=`✓ <strong>${escapeHtml(file.name)}</strong> · ${(file.size/1024/1024).toFixed(1)} MB`;toast('تم اختيار السيرة الذاتية بنجاح')});

$('#addJobBtn').addEventListener('click',()=>$('#jobModal').classList.add('open'));
$$('[data-close-job]').forEach(x=>x.addEventListener('click',()=>$('#jobModal').classList.remove('open')));
$('#jobForm').addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.currentTarget).entries()),salaryNumbers=(d.salary.match(/\d+/g)||[]).map(Number);const category=keywordCategories(`${d.title} ${d.skills}`)[0]||'engineering';const job={id:Date.now(),title:d.title,company:d.company,country:profile.country,region:profile.region,location:d.location||'غير محدد',mode:d.location.includes('بُعد')?'عن بُعد':'حضوري',minSalary:salaryNumbers[0]?(salaryNumbers[0]<1000?salaryNumbers[0]*1000:salaryNumbers[0]):Math.max(0,Number(profile.salary)-2000),maxSalary:salaryNumbers[1]?(salaryNumbers[1]<1000?salaryNumbers[1]*1000:salaryNumbers[1]):Number(profile.salary)+2000,salaryDisclosed:salaryNumbers.length>0,minExp:Math.max(0,Number(profile.experience)-2),maxExp:Number(profile.experience)+2,category,source:'إضافة يدوية',age:'أضيف الآن',skills:d.skills.split(/[،,]/).map(x=>x.trim()).filter(Boolean),description:d.description};jobs.unshift(job);const custom=jobs.filter(j=>j.id>1000);localStorage.setItem('masarCustomJobs',JSON.stringify(custom));renderJobs();$('#jobModal').classList.remove('open');e.currentTarget.reset();toast(`اكتمل التحليل: توافق الشروط ${matchDetails(job).score}%`)});

const sourceMeta={telegram:{label:'Telegram',icon:'✈',className:'telegram'},facebook:{label:'Facebook',icon:'f',className:'facebook'},linkedin:{label:'LinkedIn',icon:'in',className:'linkedin'},portal:{label:'موقع توظيف',icon:'⌕',className:'portal'},company:{label:'صفحة شركة',icon:'⌂',className:'company'},email:{label:'تنبيه بريد',icon:'✉',className:'email'}};
function renderSources(){const grid=$('#channelGrid');grid.innerHTML=sources.map(source=>{const meta=sourceMeta[source.type]||sourceMeta.portal;return `<article class="channel-card"><div class="channel-head"><span class="channel-icon ${meta.className}">${source.icon||meta.icon}</span><div><small>${meta.label}</small><h3>${escapeHtml(source.name)}</h3></div><i class="source-state"></i></div><div class="channel-meta"><span>${escapeHtml(source.country)}</span><span>${escapeHtml(source.sector||'كل المجالات')}</span></div><p>${escapeHtml(source.status)}</p><div class="channel-actions"><button data-sync-source="${source.id}">اختبار المصدر</button><button data-remove-source="${source.id}">حذف</button></div></article>`}).join('');$('#sourceCount').textContent=sources.length;$('#navSourceCount').textContent=sources.length;$$('[data-sync-source]').forEach(btn=>btn.onclick=()=>toast('الربط التجريبي جاهز؛ التشغيل الحقيقي يحتاج API وخادم آمن'));$$('[data-remove-source]').forEach(btn=>btn.onclick=()=>{sources=sources.filter(s=>s.id!==Number(btn.dataset.removeSource));localStorage.setItem('masarSources',JSON.stringify(sources));renderSources();toast('تم حذف المصدر')})}
$('#openSourceForm').addEventListener('click',()=>$('#sourceModal').classList.add('open'));
$$('[data-close-source]').forEach(x=>x.addEventListener('click',()=>$('#sourceModal').classList.remove('open')));
$('#sourceForm [name="type"]').addEventListener('change',e=>{const hints={telegram:'سيحتاج بوت Telegram إلى إضافته للقناة حتى يستقبل المنشورات رسميًا.',facebook:'الربط يتم عبر Meta Graph API والصلاحيات المعتمدة، وليس جمع صفحات عشوائيًا.',linkedin:'سنستخدم التنبيهات والتكاملات الرسمية فقط؛ لا يوجد scraping أو إرسال آلي غير مصرح.',portal:'يتم الربط عبر API أو RSS أو تنبيهات البريد وفق شروط الموقع.',company:'يتم فحص صفحات التوظيف العامة المسموح بها وإزالة الوظائف المكررة.',email:'يتم تحليل رسائل التنبيه الوظيفية بعد تفويض المستخدم.'};$('#connectorHint').textContent=hints[e.target.value]});
$('#sourceForm').addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.currentTarget).entries()),meta=sourceMeta[d.type];sources.unshift({id:Date.now(),...d,status:d.type==='telegram'?'بانتظار إضافة البوت':'بانتظار ربط الخادم',icon:meta.icon});localStorage.setItem('masarSources',JSON.stringify(sources));renderSources();$('#sourceModal').classList.remove('open');e.currentTarget.reset();toast('تم حفظ القناة وخطة الربط')});

const providerMeta={
 bayt:{name:'Bayt.com',mark:'ب',className:'bayt',description:'وظائف الشرق الأوسط وشمال أفريقيا'},
 tanqeeb:{name:'تنقيب',mark:'ت',className:'tanqeeb',description:'محرك بحث وظائف عربي'},
 gulftalent:{name:'GulfTalent',mark:'GT',className:'gulftalent',description:'وظائف الخليج والشرق الأوسط'}
};
function selectedLibraryCountry(){return countryLibrary.find(c=>c.name===$('#libraryCountry').value)||countryLibrary[0]}
function providerSearchUrl(provider,country,query){
 const q=encodeURIComponent(query.trim());
 const urls={
  bayt:`https://www.bayt.com/en/${country.bayt}/jobs/?q=${q}`,
  tanqeeb:`https://${country.tanqeeb}.tanqeeb.com/ar/jobs/search?keywords=${q}`,
  gulftalent:`https://www.gulftalent.com/${country.gulf}/jobs?keyword=${q}`
 };
 return urls[provider];
}
function renderProviderStrip(){
 const country=selectedLibraryCountry(),query=$('#libraryQuery').value.trim();
 $('#providerStrip').innerHTML=Object.entries(providerMeta).map(([key,meta])=>`<article class="provider-card ${meta.className}"><span class="provider-logo">${meta.mark}</span><div><small>${escapeHtml(country.name)}</small><h3>${meta.name}</h3><p>${meta.description}</p></div><button data-provider="${key}" ${query?'':'disabled'}>${query?'افتح البحث':'اكتب كلمة أولًا'} ↗</button></article>`).join('');
 $$('[data-provider]').forEach(button=>button.onclick=()=>{
  const term=$('#libraryQuery').value.trim();
  if(!term)return toast('اكتب كلمة أو تخصصًا للبحث');
  window.open(providerSearchUrl(button.dataset.provider,selectedLibraryCountry(),term),'_blank','noopener,noreferrer');
 });
}
function renderCountryLibrary(){
 const q=$('#countryLibraryFilter').value.trim().toLowerCase();
 const list=countryLibrary.filter(country=>[country.name,...country.sites.map(site=>site[0])].join(' ').toLowerCase().includes(q));
 $('#countryLibraryCount').textContent=`${list.length} دولة · ${list.reduce((sum,country)=>sum+country.sites.length,0)} مصدرًا`;
 $('#countryLibraryGrid').innerHTML=list.length?list.map(country=>`<article class="country-card"><header><span>${country.flag}</span><div><h3>${escapeHtml(country.name)}</h3><small>${country.sites.length} مواقع موثقة بالدليل</small></div></header><div class="country-source-list">${country.sites.map(([name,url],index)=>`<a href="${url}" target="_blank" rel="noopener noreferrer"><span>${index+1}</span>${escapeHtml(name)}<b>↗</b></a>`).join('')}</div><button class="outline use-country" data-library-country="${escapeHtml(country.name)}">ابحث في ${escapeHtml(country.name)}</button></article>`).join(''):`<div class="no-results">لا توجد دولة أو منصة بهذا الاسم في الدليل حاليًا.</div>`;
 $$('[data-library-country]').forEach(button=>button.onclick=()=>{$('#libraryCountry').value=button.dataset.libraryCountry;renderProviderStrip();document.querySelector('.library-search').scrollIntoView({behavior:'smooth',block:'center'});toast(`تم اختيار ${button.dataset.libraryCountry}`)});
}
function renderSpecialtyLibrary(){
 const q=$('#specialtyLibraryFilter').value.trim().toLowerCase();
 const list=specialtyLibrary.filter(item=>[item.name,...item.children,...item.keywords].join(' ').toLowerCase().includes(q));
 const specializationCount=list.reduce((sum,item)=>sum+item.children.length,0);
 $('#specialtyLibraryCount').textContent=`${list.length} مجالًا · ${specializationCount} تخصصًا`;
 $('#specialtyLibraryGrid').innerHTML=list.length?list.map(item=>`<article class="specialty-card"><header><span>${item.icon}</span><div><h3>${escapeHtml(item.name)}</h3><small>${item.children.length} تخصصًا · ${item.keywords.length} كلمة بحث</small></div></header><details><summary>عرض التخصصات</summary><div class="specialty-children">${item.children.map(child=>`<span>${escapeHtml(child)}</span>`).join('')}</div></details><div class="keyword-cloud">${item.keywords.slice(0,8).map(keyword=>`<button data-specialty-query="${escapeHtml(keyword)}">${escapeHtml(keyword)}</button>`).join('')}</div><button class="primary use-specialty" data-specialty-query="${escapeHtml(item.name)}">استخدم المجال في البحث</button></article>`).join(''):`<div class="no-results">لا يوجد تخصص مطابق. جرّب اسمًا عربيًا أو إنجليزيًا أو اسم برنامج مثل Revit أو SAP.</div>`;
 $$('[data-specialty-query]').forEach(button=>button.onclick=()=>{$('#libraryQuery').value=button.dataset.specialtyQuery;renderProviderStrip();document.querySelector('.library-search').scrollIntoView({behavior:'smooth',block:'center'});toast(`تم تجهيز بحث: ${button.dataset.specialtyQuery}`)});
}
$('#prepareMultiSearch').addEventListener('click',()=>{if(!$('#libraryQuery').value.trim())return toast('اكتب كلمة أو تخصصًا أولًا');renderProviderStrip();toast('تم تجهيز البحث في المواقع الثلاثة — اختر الموقع الذي تريد فتحه')});
$('#libraryQuery').addEventListener('input',renderProviderStrip);
$('#libraryQuery').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();$('#prepareMultiSearch').click()}});
$('#libraryCountry').addEventListener('change',renderProviderStrip);
$('#countryLibraryFilter').addEventListener('input',renderCountryLibrary);
$('#specialtyLibraryFilter').addEventListener('input',renderSpecialtyLibrary);
$$('[data-library-tab]').forEach(button=>button.addEventListener('click',()=>{$$('[data-library-tab]').forEach(item=>item.classList.toggle('active',item===button));$('#countriesLibrary').classList.toggle('active',button.dataset.libraryTab==='countries');$('#specialtiesLibrary').classList.toggle('active',button.dataset.libraryTab==='specialties')}));

function salaryCategory(role){const cats=keywordCategories(role);return cats.find(c=>c!=='engineering')||cats[0]||'engineering'}
function calculateSalary(data,tools){const base={architecture:11500,civil:11000,mechanical:11500,electrical:11800,projects:14000,engineering:10800}[salaryCategory(data.role)]||10800;const exp=Number(data.experience);const experienceFactor=1+Math.min(exp,20)*.052;const countryFactor={السعودية:1,الإمارات:1.16,قطر:1.18,الكويت:1.09,البحرين:.94,عُمان:.91}[data.country]||1;const cityFactor={الرياض:1.08,جدة:1.03,الدمام:1.02,دبي:1.16,'أبوظبي':1.13,الدوحة:1.11}[data.city]||1;const educationFactor={diploma:.90,bachelor:1,master:1.08,phd:1.12}[data.education];const languageFactor={basic:.95,good:1,fluent:1.06,bilingual:1.1}[data.english];const certificationFactor={none:1,one:1.04,advanced:1.09}[data.certification];const companyFactor={small:.9,medium:1,large:1.15}[data.companySize];const toolsFactor=1+tools.length*.018+(tools.includes('leadership') ? .025 : 0);const mid=Math.round(base*experienceFactor*countryFactor*cityFactor*educationFactor*languageFactor*certificationFactor*companyFactor*toolsFactor/100)*100;return {mid,low:Math.round(mid*.88/100)*100,high:Math.round(mid*1.12/100)*100,category:salaryCategory(data.role),factors:{experience:Math.round((experienceFactor-1)*100),location:Math.round((countryFactor*cityFactor-1)*100),education:Math.round((educationFactor-1)*100),language:Math.round((languageFactor-1)*100),tools:Math.round((toolsFactor-1)*100)}}}
$('#salaryForm').addEventListener('submit',e=>{e.preventDefault();const form=new FormData(e.currentTarget),data=Object.fromEntries(form.entries()),tools=form.getAll('tools'),result=calculateSalary(data,tools);$('#salaryResult').innerHTML=`<span class="eyebrow">تقديرك السوقي الشهري</span><small>${escapeHtml(data.role)} · ${escapeHtml(data.city)}، ${escapeHtml(data.country)}</small><div class="salary-number"><strong>${result.mid.toLocaleString('ar-SA')}</strong><span>ر.س مكافئ</span></div><div class="salary-range"><span>النطاق المرجح</span><strong>${result.low.toLocaleString('ar-SA')} — ${result.high.toLocaleString('ar-SA')}</strong></div><div class="salary-confidence"><span>ثقة التقدير</span><div><i style="width:${Math.min(92,62+tools.length*4)}%"></i></div><b>${Math.min(92,62+tools.length*4)}%</b></div><h4>العوامل المؤثرة</h4><div class="factor-list"><span>الخبرة <b>+${result.factors.experience}%</b></span><span>الدولة والمدينة <b>${result.factors.location>=0?'+':''}${result.factors.location}%</b></span><span>المؤهل <b>${result.factors.education>=0?'+':''}${result.factors.education}%</b></span><span>اللغة <b>${result.factors.language>=0?'+':''}${result.factors.language}%</b></span><span>البرامج والمهارات <b>+${result.factors.tools}%</b></span></div><button class="outline wide-btn" id="useTargetSalary">استخدم ${result.mid.toLocaleString('ar-SA')} كراتبي المستهدف</button><p class="salary-caveat">هذا تقدير أولي مبني على نموذج عوامل سوقية. النسخة الإنتاجية ستُعاير ببيانات رواتب مرخصة ومحدثة لكل دولة وتخصص.</p>`;$('#useTargetSalary').onclick=()=>{profile.salary=result.mid;localStorage.setItem('masarProfile',JSON.stringify(profile));fillProfile();renderJobs();toast('تم تحديث راتبك المستهدف')};});

document.addEventListener('keydown',e=>{if(e.key==='Escape'){$$('.modal').forEach(m=>m.classList.remove('open'));$('.sidebar').classList.remove('open')}});
fillProfile();renderJobs();renderApplications();renderSources();renderProviderStrip();renderCountryLibrary();renderSpecialtyLibrary();renderApplicationMode();runAutoApply();startAuth();

if('serviceWorker' in navigator&&location.protocol.startsWith('http')){
 let refreshing=false;
 navigator.serviceWorker.addEventListener('controllerchange',()=>{if(refreshing)return;refreshing=true;location.reload()});
 window.addEventListener('load',async()=>{
  try{
   const registration=await navigator.serviceWorker.register('./service-worker.js');
   const activateUpdate=worker=>worker?.postMessage({type:'SKIP_WAITING'});
   if(registration.waiting)activateUpdate(registration.waiting);
   registration.addEventListener('updatefound',()=>{
    const worker=registration.installing;
    worker?.addEventListener('statechange',()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller){toast('يتوفر تحديث جديد — يتم تفعيله الآن');activateUpdate(worker)}});
   });
   setInterval(()=>registration.update(),60000);
   document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')registration.update()});
  }catch(error){console.warn('تعذر تشغيل التحديث التلقائي',error)}
 });
}
