let skiData=null;
async function loadSkiTrip(){
  const root=document.getElementById('skiContent');
  try{
    const response=await fetch('data/ski-2027.json?v=20260914-3',{cache:'no-store'});
    if(!response.ok)throw new Error('Skiferiedata kunne ikke hentes');
    skiData=await response.json();
    document.getElementById('skiTitle').textContent=skiData.trip.title;
    document.getElementById('skiSubtitle').textContent=skiData.trip.subtitle;
    document.getElementById('skiStatus').textContent=skiData.trip.status;
    document.getElementById('skiCandidate').textContent=skiData.trip.candidate;
    renderTabs();
    const requested=location.hash.replace('#','');
    selectTab(skiData.tabs.some(t=>t.id===requested)?requested:skiData.tabs[0].id,false);
  }catch(error){
    console.error(error);
    root.innerHTML='<article class="ski-card"><h2>Data kunne ikke indlæses</h2><p>Genindlæs siden og prøv igen.</p></article>';
  }
}
function renderTabs(){
  const nav=document.getElementById('skiTabs');
  nav.innerHTML=skiData.tabs.map(tab=>'<button class="ski-tab" type="button" role="tab" aria-selected="false" data-tab="'+escapeHtml(tab.id)+'"><span aria-hidden="true">'+escapeHtml(tab.icon||'•')+'</span><strong>'+escapeHtml(tab.label)+'</strong></button>').join('');
  nav.querySelectorAll('.ski-tab').forEach(button=>button.addEventListener('click',()=>selectTab(button.dataset.tab,true)));
}
function selectTab(id,scroll){
  const tab=skiData.tabs.find(item=>item.id===id)||skiData.tabs[0];
  document.querySelectorAll('.ski-tab').forEach(button=>{
    const active=button.dataset.tab===tab.id;
    button.classList.toggle('active',active);
    button.setAttribute('aria-selected',active?'true':'false');
  });
  document.getElementById('skiContent').innerHTML=renderTab(tab);
  history.replaceState(null,'','#'+tab.id);
  if(scroll)document.getElementById('skiTabs').scrollIntoView({behavior:'smooth',block:'start'});
}
function renderTab(tab){
  const intro=tab.intro?'<div class="tab-intro"><p>'+escapeHtml(tab.intro)+'</p></div>':'';
  const featured=tab.featuredLink?'<a class="featured-link" href="'+escapeHtml(tab.featuredLink.url)+'" target="_blank" rel="noopener noreferrer"><span class="featured-icon">🗺️</span><span><strong>'+escapeHtml(tab.featuredLink.title)+'</strong><small>'+escapeHtml(tab.featuredLink.text||'')+'</small></span><b>↗</b></a>':'';
  const cards=Array.isArray(tab.cards)?'<div class="ski-grid">'+tab.cards.map(renderCard).join('')+'</div>':'';
  const facts=Array.isArray(tab.facts)?'<article class="ski-card wide-card"><dl class="ski-facts">'+tab.facts.map(renderFact).join('')+'</dl></article>':'';
  const restaurants=Array.isArray(tab.restaurants)?'<section class="restaurant-section"><div class="restaurant-grid">'+tab.restaurants.map(r=>'<article class="restaurant-card"><h3>'+escapeHtml(r.name)+'</h3><p class="restaurant-type">'+escapeHtml(r.type||'')+'</p><span class="rating">★ '+escapeHtml(r.rating||'')+'</span><p>'+escapeHtml(r.note||'')+'</p><a href="'+escapeHtml(r.map)+'" target="_blank" rel="noopener noreferrer">Find på kort ↗</a></article>').join('')+'</div></section>':'';
  const links=Array.isArray(tab.links)&&tab.links.length?'<article class="ski-card wide-card"><h2>Nyttige links</h2><div class="ski-links">'+tab.links.map(l=>'<a href="'+escapeHtml(l.url)+'" target="_blank" rel="noopener noreferrer"><strong>'+escapeHtml(l.title)+'</strong><b>↗</b></a>').join('')+'</div></article>':'';
  const privacy=tab.id==='praktisk'?'<article class="ski-card wide-card privacy-card"><div class="ski-icon">🔒</div><h2>Privatliv</h2><p>'+escapeHtml(skiData.trip.sourceNote)+'</p></article>':'';
  return '<section class="tab-panel" role="tabpanel"><h1 class="tab-title">'+escapeHtml(tab.icon||'')+' '+escapeHtml(tab.label)+'</h1>'+intro+featured+cards+facts+restaurants+links+privacy+'</section>';
}
function renderCard(item){
  const title=item.url?'<h2><a href="'+escapeHtml(item.url)+'" target="_blank" rel="noopener noreferrer">'+escapeHtml(item.title)+' ↗</a></h2>':'<h2>'+escapeHtml(item.title)+'</h2>';
  return '<article class="ski-card"><div class="ski-icon">'+escapeHtml(item.icon||'ℹ️')+'</div>'+title+'<p>'+escapeHtml(item.text||'')+'</p></article>';
}
function renderFact(item){return '<div class="ski-fact"><dt>'+escapeHtml(item.label)+'</dt><dd>'+escapeHtml(item.value)+'</dd></div>'}
function escapeHtml(value){return String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));}
async function registerServiceWorker(){if(!('serviceWorker' in navigator))return;try{const r=await navigator.serviceWorker.register('service-worker.js?v=20260914-3',{updateViaCache:'none'});await r.update()}catch(e){console.error(e)}}
loadSkiTrip();registerServiceWorker();