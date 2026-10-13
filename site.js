document.querySelectorAll(".menu").forEach(btn=>btn.addEventListener("click",()=>{const nav=document.querySelector(".nav nav");if(nav)nav.classList.toggle("open")}));document.querySelectorAll(".nav nav a").forEach(a=>a.addEventListener("click",()=>{const nav=document.querySelector(".nav nav");if(nav)nav.classList.remove("open")}));document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());
// SULARC DIGITAL LIBRARY NAVIGATION
(function(){function add(){
 for(const nav of document.querySelectorAll('header nav')){
  if(nav.querySelector('a[href="digital-library.html"]'))continue;
  const link=document.createElement('a');link.href='digital-library.html';link.textContent='Digital Library';
  const catalogue=nav.querySelector('a[href="catalogue.html"]');if(catalogue)catalogue.after(link);else nav.append(link);
 }
 const actions=document.querySelector('.hero .actions');
 if(actions&&!actions.querySelector('a[href="digital-library.html"]')){const link=document.createElement('a');link.href='digital-library.html';link.className='outline';link.textContent='Digital Library';actions.append(link)}
}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',add);else add()})();
