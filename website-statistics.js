(async function(){
const status=document.getElementById('statistics-status');
try {
 const response=await fetch('https://sularc1985.pythonanywhere.com/api/public/statistics',{cache:'no-store',credentials:'omit',signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw new Error('Statistics unavailable');
 const data=await response.json();
 for(const element of document.querySelectorAll('[data-stat]')){
  const value=data.statistics[element.dataset.stat];
  if(!Number.isSafeInteger(value)||value<0)throw new Error('Invalid statistics');
  element.textContent=value.toLocaleString('en-IN');
 }
 status.textContent='Updated from library records · '+data.year;
}catch(error){status.textContent='Statistics temporarily unavailable. Please try again later.';}
})();
