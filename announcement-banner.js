/* SULARC public announcements: published public APIs only. */
(async function(){
'use strict';
if(document.getElementById('sularc-public-announcements'))return;
const API='https://sularc1985.pythonanywhere.com/api/public/';
const dateParts=new Intl.DateTimeFormat('en',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
const value=t=>dateParts.find(p=>p.type===t).value;
const todayISO=`${value('year')}-${value('month')}-${value('day')}`;
const shift=n=>{const d=new Date(todayISO+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)};
const valid=d=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&!Number.isNaN(Date.parse(d+'T12:00:00Z'));
async function load(type){const r=await fetch(API+type,{credentials:'omit',cache:'no-store',signal:AbortSignal.timeout(15000)});if(!r.ok)throw new Error(type+' unavailable');const d=await r.json();return Array.isArray(d[type])?d[type]:[]}
const result=await Promise.allSettled([load('notices'),load('events')]);
const notices=result[0].status==='fulfilled'?result[0].value:[];
const events=result[1].status==='fulfilled'?result[1].value:[];
const items=[];
notices.filter(n=>valid(String(n.notice_date||'').slice(0,10))&&n.notice_date.slice(0,10)>=shift(-30)&&n.notice_date.slice(0,10)<=todayISO).slice(0,5).forEach(n=>items.push({kind:'Notice',date:n.notice_date.slice(0,10),title:n.title_ml||n.title,url:'notices.html'}));
events.filter(e=>valid(String(e.event_date||'').slice(0,10))&&e.event_date.slice(0,10)>=todayISO&&e.event_date.slice(0,10)<=shift(30)).sort((a,b)=>a.event_date.localeCompare(b.event_date)).slice(0,5).forEach(e=>items.push({kind:'Event',date:e.event_date.slice(0,10),title:e.title_ml||e.title,url:'events.html'}));
if(!items.length)return;
const header=document.querySelector('header.top');if(!header)return;
const style=document.createElement('style');style.textContent=`
#sularc-public-announcements{background:#fff7df;border-bottom:1px solid #d7b863;color:#17324a;padding:12px 0}
#sularc-public-announcements .pa-heading{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:8px}
#sularc-public-announcements button{padding:5px 10px;border:1px solid #b5a16b;background:white;color:#17324a;border-radius:6px;cursor:pointer}
#sularc-public-announcements .pa-window{overflow:hidden}
#sularc-public-announcements .pa-track{display:inline-flex;gap:20px;white-space:nowrap;animation:public-announcement-scroll 60s linear infinite}
#sularc-public-announcements .pa-item{display:inline-block;background:white;padding:7px 12px;border-radius:7px;color:#17324a;text-decoration:none}
#sularc-public-announcements .pa-event{background:#e5f5ed;font-weight:700}
#sularc-public-announcements:hover .pa-track,#sularc-public-announcements:focus-within .pa-track{animation-play-state:paused}
#sularc-public-announcements.pa-paused .pa-track{animation:none;white-space:normal;flex-wrap:wrap}
@keyframes public-announcement-scroll{from{transform:translateX(0)}to{transform:translateX(-100%)}}
@media(prefers-reduced-motion:reduce){#sularc-public-announcements .pa-track{animation:none;white-space:normal;flex-wrap:wrap}}
`;document.head.append(style);
const section=document.createElement('section');section.id='sularc-public-announcements';section.setAttribute('aria-label','Library announcements');
const wrap=document.createElement('div');wrap.className='wrap';const heading=document.createElement('div');heading.className='pa-heading';
const title=document.createElement('strong');title.textContent='📢 Library announcements / അറിയിപ്പുകൾ';
const pause=document.createElement('button');pause.type='button';pause.textContent='Pause scroll';pause.setAttribute('aria-pressed','false');pause.addEventListener('click',()=>{const p=section.classList.toggle('pa-paused');pause.textContent=p?'Resume scroll':'Pause scroll';pause.setAttribute('aria-pressed',String(p))});
heading.append(title,pause);
for(const [text,url] of [['All notices','notices.html'],['All events','events.html']]){const a=document.createElement('a');a.textContent=text;a.href=url;heading.append(a)}
const windowBox=document.createElement('div');windowBox.className='pa-window';const track=document.createElement('div');track.className='pa-track';
for(const item of items){const a=document.createElement('a');a.href=item.url;a.className='pa-item'+(item.kind==='Event'?' pa-event':'');const date=item.date.split('-').reverse().join('-');a.textContent=`${item.kind==='Event'?'📅 Event':'📢 Notice · Published'} ${date} — ${String(item.title||'Library announcement')}`;track.append(a)}
windowBox.append(track);wrap.append(heading,windowBox);section.append(wrap);header.after(section);
})().catch(error=>console.warn('Public announcements:',error.message));
