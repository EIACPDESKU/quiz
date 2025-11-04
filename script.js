(function(){
const sidebar = document.getElementById('sidebar');
const webview = document.getElementById('webview');
const btns = Array.from(document.querySelectorAll('.page-btn'));
const toggle = document.querySelector('.menu-toggle');


// Load saved page or default
const saved = localStorage.getItem('selectedPage');
if(saved){
webview.src = saved;
btns.forEach(b=> b.classList.toggle('active', b.dataset.page === saved));
}


// Button clicks
btns.forEach(btn => {
btn.addEventListener('click', () => {
const page = btn.dataset.page;
if(!page) return;


// If external link (starts with http), open in new tab to avoid mixed origin inside iframe
if(page.startsWith('http')){
window.open(page, '_blank');
return;
}


webview.src = page;
localStorage.setItem('selectedPage', page);
btns.forEach(b=> b.classList.remove('active'));
btn.classList.add('active');


// On small screens, auto-close sidebar
if(window.matchMedia('(max-width:900px)').matches){
sidebar.classList.remove('open');
}
});
});


// Toggle sidebar (hamburger)
toggle.addEventListener('click', ()=>{
sidebar.classList.toggle('open');
});


// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e)=>{
if(!window.matchMedia('(max-width:900px)').matches) return;
if(!sidebar.classList.contains('open')) return;
if(e.target.closest('.sidebar') || e.target.closest('.menu-toggle')) return;
sidebar.classList.remove('open');
});


// Keyboard navigation: 1/2/3 to switch
window.addEventListener('keydown', (e)=>{
if(document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) return;
if(e.key === '1') btns[0] && btns[0].click();
if(e.key === '2') btns[1] && btns[1].click();
if(e.key === '3') btns[2] && btns[2].click();
});


})();
