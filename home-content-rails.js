/* Home page previews use the same public APIs as the full content pages. */
(function(){
 'use strict';
 const API='https://sularc1985.pythonanywhere.com/api/public/';
 const safeURL=value=>{if(typeof value!=='string'||!value.trim())return '';try{const u=new URL(value,API);return ['http:','https:'].includes(u.protocol)?u.href:''}catch{return ''}};
 const text=(parent,tag,value,className)=>{if(!value)return;const el=document.createElement(tag);el.textContent=String(value);if(className)el.className=className;parent.append(el);return el};
 function message(track,value){track.replaceChildren();text(track,'p',value,'empty-state').setAttribute('role','status')}
 function card(kind,item){
  const article=document.createElement('article');article.className='rail-card';
  if(kind==='gallery'){
   const photo=(Array.isArray(item.photos)?item.photos:[]).find(p=>safeURL(p.url));
   if(photo){const img=document.createElement('img');img.src=safeURL(photo.url);img.alt=photo.caption_ml||photo.caption||item.title||'Library gallery photo';img.loading='lazy';img.className='rail-photo';article.append(img)}
   else text(article,'div','📷','rail-photo-placeholder');
  }
  text(article,'span',kind==='events'?(item.wing||'Library'):kind==='notices'?(item.category||'Notice'):'Gallery','badge');
  text(article,'h3',item.title||item.title_ml||'Library update');
  if(item.title_ml&&item.title_ml!==item.title)text(article,'h4',item.title_ml);
  text(article,'small',item.event_date||item.notice_date||item.album_date);
  text(article,'p',kind==='events'?(item.details_ml||item.details):kind==='notices'?(item.body_ml||item.body):(item.description_ml||item.description));
  const link=text(article,'a',kind==='gallery'?'View album →':'Read more →');link.href=kind+'.html';return article;
 }
 async function load(kind){
  const track=document.getElementById('home-'+kind+'-rail');if(!track)return;
  try{
   const response=await fetch(API+kind,{credentials:'omit',cache:'no-store',signal:AbortSignal.timeout(15000)});
   if(!response.ok)throw Error('Unavailable');
   const data=await response.json(),items=data[kind==='gallery'?'albums':kind];
   if(!Array.isArray(items))throw Error('Invalid response');
   if(!items.length){message(track,'No published '+(kind==='gallery'?'albums':kind)+' at present.');return}
   track.replaceChildren(...items.slice(0,12).map(item=>card(kind,item)));
  }catch{message(track,'Could not load '+kind+'. Please use “View all” or try again later.')}
 }
 function setup(track){
  const name=track.dataset.rail;
  track.setAttribute('tabindex','0');track.setAttribute('role','region');track.setAttribute('aria-label',name+' — horizontally scrollable');
  const controls=document.createElement('div');controls.className='rail-controls';controls.hidden=true;
  text(controls,'span','Swipe sideways to explore');
  const prev=text(controls,'button','←'),next=text(controls,'button','→');
  prev.type=next.type='button';prev.setAttribute('aria-label','Previous '+name);next.setAttribute('aria-label','Next '+name);
  prev.setAttribute('aria-controls',track.id);next.setAttribute('aria-controls',track.id);track.after(controls);
  const update=()=>{const max=track.scrollWidth-track.clientWidth;controls.hidden=max<=2;prev.disabled=track.scrollLeft<=2;next.disabled=track.scrollLeft>=max-2};
  const move=direction=>{const first=track.firstElementChild;const step=first?first.getBoundingClientRect().width+16:track.clientWidth;const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;track.scrollBy({left:step*direction,behavior:reduced?'auto':'smooth'})};
  prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
  track.addEventListener('keydown',event=>{if(event.target!==track)return;if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();move(event.key==='ArrowRight'?1:-1)}});
  track.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);
  new MutationObserver(update).observe(track,{childList:true});
  if(window.ResizeObserver)new ResizeObserver(update).observe(track);
  update();
 }
 document.querySelectorAll('[data-rail]').forEach(setup);
 ['events','notices','gallery'].forEach(load);
})();
