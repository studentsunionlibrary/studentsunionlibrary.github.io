// Responsive navigation: keyboard, outside click and route selection.
(function(){
 const header=document.querySelector('header.top');
 const nav=header&&header.querySelector('nav');
 const button=header&&header.querySelector('.menu');
 if(!nav||!button)return;
 nav.id=nav.id||'primary-navigation';
 button.type='button';button.setAttribute('aria-controls',nav.id);
 const closeGroups=()=>nav.querySelectorAll('.nav-group[open]').forEach(group=>group.open=false);
 const setOpen=open=>{if(!open)closeGroups();nav.classList.toggle('open',open);button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Close menu':'Open menu');button.textContent=open?'✕':'☰';};
 setOpen(false);
 button.addEventListener('click',()=>setOpen(!nav.classList.contains('open')));
 nav.addEventListener('click',event=>{if(event.target.closest('a'))setOpen(false)});
 document.addEventListener('keydown',event=>{if(event.key!=='Escape')return;const group=nav.querySelector('.nav-group[open]');if(group){group.open=false;group.querySelector('summary').focus()}else if(nav.classList.contains('open')){setOpen(false);button.focus()}});
 nav.querySelectorAll('.nav-group').forEach(group=>group.addEventListener('toggle',()=>{if(group.open)nav.querySelectorAll('.nav-group').forEach(other=>{if(other!==group)other.open=false})}));
 document.addEventListener('click',event=>{if(!header.contains(event.target))setOpen(false)});
 window.matchMedia('(max-width:900px)').addEventListener('change',()=>setOpen(false));
})();
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
// SULARC DIGITAL LIBRARY NAVIGATION
(function(){function add(){
 for(const nav of document.querySelectorAll('header nav')){
  if(nav.querySelector('.nav-group'))continue;
  if(nav.querySelector('a[href="digital-library.html"]'))continue;
  const link=document.createElement('a');link.href='digital-library.html';link.textContent='Digital Library';
  const catalogue=nav.querySelector('a[href="catalogue.html"]');if(catalogue)catalogue.after(link);else nav.append(link);
 }
 const actions=document.querySelector('.hero .actions');
 if(actions&&!actions.querySelector('a[href="digital-library.html"]')){const link=document.createElement('a');link.href='digital-library.html';link.className='outline';link.textContent='Digital Library';actions.append(link)}
}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',add);else add()})();

// SULARC PUBLIC ANNOUNCEMENT BANNER
(function(){if(document.querySelector('script[data-public-banner]'))return;const s=document.createElement('script');s.src='announcement-banner.js?v=20261013';s.dataset.publicBanner='1';s.defer=true;document.head.append(s)})();
