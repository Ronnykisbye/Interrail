let tripData=null;
async function loadTrip(){
  const root=document.getElementById('content');
  try{
    const r=await fetch('data/kaunas.json?v=20261117-1',{cache:'no-store'});
    if(!r.ok)throw new Error('Data kunne ikke hentes');
    tripData=await r.json();renderTabs();selectTab(location.hash.slice(1)||'overblik',false);
  }catch(e){console.error(e);root.innerHTML='<article class="card"><h2>Data kunne ikke indlæses</h2><p>Prøv at genindlæse siden.</p></article>'}
}
function renderTabs(){
  const nav=document.getElementById('tabs');
  nav.innerHTML=tripData.tabs.map(t=>'<button class="tab" data-id="'+esc(t.id)+'">'+esc(t.icon)+' '+esc(t.label)+'</button>').join('');
  nav.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>selectTab(b.dataset.id,true)));
}
function selectTab(id,scroll){
  const t=tripData.tabs.find(x=>x.id===id)||tripData.tabs[0];
  document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.id===t.id));
  document.getElementById('content').innerHTML=renderTab(t);
  history.replaceState(null,'','#'+t.id);
  if(scroll)document.querySelector('.tabs').scrollIntoView({behavior:'smooth',block:'start'});
}
function renderTab(t){
  const cards=(t.cards||[]).map(c=>'<article class="card '+(c.wide?'wide':'')+'"><div class="icon">'+esc(c.icon||'ℹ️')+'</div><h2>'+esc(c.title)+'</h2><p>'+esc(c.text||'')+'</p>'+(c.url?'<a class="action" href="'+esc(c.url)+'" target="_blank" rel="noopener noreferrer">Åbn link ↗</a>':'')+'</article>').join('');
  const facts=t.facts?'<article class="card wide">'+t.facts.map(f=>'<div class="fact"><strong>'+esc(f.label)+'</strong><span>'+esc(f.value)+'</span></div>').join('')+'</article>':'';
  const links=t.links?'<article class="card wide"><h2>Nyttige links</h2><div class="links">'+t.links.map(l=>'<a href="'+esc(l.url)+'" target="_blank" rel="noopener noreferrer">'+esc(l.title)+'<small>'+esc(l.text||'')+'</small></a>').join('')+'</div></article>':'';
  return '<p class="intro">'+esc(t.intro||'')+'</p><div class="grid">'+cards+facts+links+'</div>';
}
function esc(v){return String(v??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]))}
loadTrip();