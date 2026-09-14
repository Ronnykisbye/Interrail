let skiData=null;

async function loadSkiTrip(){
  const root=document.getElementById('skiContent');
  try{
    const response=await fetch('data/ski-2027.json?v=20260914-5',{cache:'no-store'});
    if(!response.ok) throw new Error('Skiferiedata kunne ikke hentes');
    skiData=await response.json();
    document.getElementById('skiTitle').textContent=skiData.trip.title;
    document.getElementById('skiSubtitle').textContent='30. januar – 6. februar 2027';
    document.getElementById('skiStatus').textContent=skiData.trip.status;
    document.getElementById('skiCandidate').textContent=skiData.trip.candidate;
    renderTabs();
    const requested=location.hash.replace('#','');
    selectTab(skiData.tabs.some(t=>t.id===requested)?requested:'overblik',false);
  }catch(error){
    console.error(error);
    root.innerHTML='<article class="ski-card"><h2>Data kunne ikke indlæses</h2><p>Genindlæs siden og prøv igen.</p></article>';
  }
}

function renderTabs(){
  const nav=document.getElementById('skiTabs');
  const iconMap={overblik:'⌂',sestriere:'⛰',ski:'⛷',pistekort:'🗺',spisesteder:'🍴',hotel:'🛏',rejse:'✈',praktisk:'ℹ'};
  nav.innerHTML=skiData.tabs.map(tab=>
    '<button class="ski-tab" type="button" role="tab" aria-selected="false" data-tab="'+escapeHtml(tab.id)+'">'+
    '<span aria-hidden="true">'+escapeHtml(iconMap[tab.id]||tab.icon||'•')+'</span><strong>'+escapeHtml(tab.label)+'</strong></button>'
  ).join('');
  nav.querySelectorAll('.ski-tab').forEach(btn=>btn.addEventListener('click',()=>selectTab(btn.dataset.tab,true)));
}

function selectTab(id,scroll){
  const tab=skiData.tabs.find(t=>t.id===id)||skiData.tabs[0];
  document.querySelectorAll('.ski-tab').forEach(btn=>{
    const active=btn.dataset.tab===tab.id;
    btn.classList.toggle('active',active);
    btn.setAttribute('aria-selected',active?'true':'false');
  });
  document.getElementById('skiContent').innerHTML=tab.id==='overblik'?renderDashboard():renderTab(tab);
  history.replaceState(null,'','#'+tab.id);
  if(scroll)document.querySelector('.ski-tabs-wrap').scrollIntoView({behavior:'smooth',block:'start'});
}

function renderDashboard(){
  return `
  <section class="tab-panel">
    <div class="dashboard-grid">
      <article class="dashboard-card">
        <h2>🧾 Rejseinformation</h2>
        ${row('✈️','Afrejse','30. januar 2027 · CPH 17:20 → Torino 19:20')}
        ${row('✈️','Hjemrejse','6. februar 2027 · Torino 20:20 → CPH 22:25')}
        ${row('🛏️','Hotel','Grand Hotel Sestriere · Dobbeltværelser · Halvpension')}
        ${row('🎿','Liftkort','6 dage · Via Lattea')}
        ${row('👥','Deltagere','4 personer · Ronny, Camilla, Gabriella, Friedrich')}
        <a class="card-btn" href="#rejse" data-jump="rejse">Se rejseinformation →</a>
      </article>

      <article class="dashboard-card">
        <h2>🏨 Grand Hotel Sestriere</h2>
        ${row('🍴','Halvpension','Morgenmad + aftensmad')}
        ${row('🛗','Faciliteter','Elevator · ski-rum · Wi‑Fi')}
        ${row('♨️','Wellness','Sauna · dampbad · jacuzzi')}
        ${row('📍','Beliggenhed','Ca. 600 m til lift og piste')}
        <a class="card-btn primary" href="#hotel" data-jump="hotel">Se hotelinformation →</a>
      </article>

      <article class="dashboard-card">
        <h2>💼 Betaling og booking</h2>
        ${row('✅','Status','Bestilt via Slopestar')}
        ${row('🔢','Bookingnummer','2616602')}
        ${row('💳','1. rate','7.600 kr. · senest 15. september 2026')}
        ${row('🕒','2. rate','41.165 kr. · senest 1. december 2026')}
        ${row('💰','Samlet pris','48.765 kr.')}
        <a class="card-btn green" href="https://www.slopestar.dk/" target="_blank" rel="noopener noreferrer">Gå til Slopestar →</a>
      </article>

      <article class="dashboard-card">
        <h2>🏔️ Sestriere</h2>
        <ul class="check-list">
          <li>2.035 meter over havet</li>
          <li>En del af Via Lattea</li>
          <li>Olympisk skisportsby</li>
          <li>Butikker, caféer og restauranter i centrum</li>
        </ul>
        <a class="card-btn" href="#sestriere" data-jump="sestriere">Læs mere om Sestriere →</a>
      </article>

      <article class="dashboard-card">
        <h2>⛷️ Skiløb</h2>
        <ul class="check-list">
          <li>315 km pister ifølge rejsebeviset</li>
          <li>6 dages liftkort</li>
          <li>1 dag i Montgenèvre</li>
          <li>Blå, røde og sorte pister</li>
          <li>Aktuelle lifte og pister online</li>
        </ul>
        <a class="card-btn" href="#ski" data-jump="ski">Alt om skiløb →</a>
      </article>

      <article class="dashboard-card">
        <h2>🗺️ Pistekort</h2>
        <ul class="check-list">
          <li>Via Lattea oversigt</li>
          <li>Dansk pistekort-link</li>
          <li>Åbne lifte og pister</li>
          <li>Montgenèvre-forbindelse</li>
        </ul>
        <a class="card-btn" href="#pistekort" data-jump="pistekort">Se pistekort →</a>
      </article>

      <article class="dashboard-card">
        <h2>🍝 Spisesteder i Sestriere</h2>
        <ul class="check-list">
          <li>Pizza og italiensk køkken</li>
          <li>Piemontesiske specialiteter</li>
          <li>Restaurantlinks og kort</li>
          <li>Muligheder nær hotellet</li>
        </ul>
        <a class="card-btn" href="#spisesteder" data-jump="spisesteder">Se spisesteder →</a>
      </article>

      <article class="dashboard-card">
        <h2>⚙️ Praktisk information</h2>
        <ul class="check-list">
          <li>Forsikring og sikkerhed</li>
          <li>Hjelmregler i Italien</li>
          <li>Skileje og udstyr</li>
          <li>Bagage og check-in</li>
          <li>Nyttige links</li>
        </ul>
        <a class="card-btn" href="#praktisk" data-jump="praktisk">Se praktisk info →</a>
      </article>

      <article class="dashboard-card">
        <h2>👤 Deltagere</h2>
        <div class="participant-list">
          ${person('R','Ronny Jean Birchholdt Kisbye','Ski og stave · Superior · Hjelm')}
          ${person('C','Camilla Vaidelyté Kisbye','Ski, støvler og stave · Superior')}
          ${person('G','Gabriella Vaidelyté Kisbye','Ski, støvler og stave · Superior')}
          ${person('F','Friedrich Kolja Severin Rossbach','Skitransport med fly')}
        </div>
      </article>
    </div>
  </section>`;
}

function row(icon,label,value){
  return '<div class="list-row"><div class="ico">'+icon+'</div><div><strong>'+escapeHtml(label)+'</strong><span>'+escapeHtml(value)+'</span></div></div>';
}
function person(initial,name,detail){
  return '<div class="person"><div class="avatar">'+escapeHtml(initial)+'</div><div><strong>'+escapeHtml(name)+'</strong><small>'+escapeHtml(detail)+'</small></div></div>';
}

function renderTab(tab){
  const intro=tab.intro?'<div class="tab-intro"><p>'+escapeHtml(tab.intro)+'</p></div>':'';
  const featured=tab.featuredLink?'<a class="featured-link" href="'+escapeHtml(tab.featuredLink.url)+'" target="_blank" rel="noopener noreferrer"><span>🗺️</span><span><strong>'+escapeHtml(tab.featuredLink.title)+'</strong><small>'+escapeHtml(tab.featuredLink.text||'')+'</small></span><b>↗</b></a>':'';
  const cards=Array.isArray(tab.cards)?'<div class="ski-grid">'+tab.cards.map(renderCard).join('')+'</div>':'';
  const facts=Array.isArray(tab.facts)?'<article class="ski-card wide-card"><dl class="ski-facts">'+tab.facts.map(renderFact).join('')+'</dl></article>':'';
  const restaurants=Array.isArray(tab.restaurants)?'<div class="restaurant-grid">'+tab.restaurants.map(r=>'<article class="restaurant-card"><h3>'+escapeHtml(r.name)+'</h3><p class="restaurant-type">'+escapeHtml(r.type||'')+'</p><span class="rating">★ '+escapeHtml(r.rating||'')+'</span><p>'+escapeHtml(r.note||'')+'</p><a href="'+escapeHtml(r.map)+'" target="_blank" rel="noopener noreferrer">Find på kort ↗</a></article>').join('')+'</div>':'';
  const links=Array.isArray(tab.links)&&tab.links.length?'<article class="ski-card wide-card"><h2>Nyttige links</h2><div class="ski-links">'+tab.links.map(l=>'<a href="'+escapeHtml(l.url)+'" target="_blank" rel="noopener noreferrer"><span><strong>'+escapeHtml(l.title)+'</strong><small>'+escapeHtml(l.text||'')+'</small></span><b>↗</b></a>').join('')+'</div></article>':'';
  return '<section class="tab-panel"><h1 class="tab-title">'+escapeHtml(tab.icon||'')+' '+escapeHtml(tab.label)+'</h1>'+intro+featured+cards+facts+restaurants+links+'</section>';
}

function renderCard(item){
  const title=item.url?'<h2><a href="'+escapeHtml(item.url)+'" target="_blank" rel="noopener noreferrer">'+escapeHtml(item.title)+' ↗</a></h2>':'<h2>'+escapeHtml(item.title)+'</h2>';
  return '<article class="ski-card"><div class="ski-icon">'+escapeHtml(item.icon||'ℹ️')+'</div>'+title+'<p>'+escapeHtml(item.text||'')+'</p></article>';
}
function renderFact(item){return '<div class="ski-fact"><dt>'+escapeHtml(item.label)+'</dt><dd>'+escapeHtml(item.value)+'</dd></div>'}
function escapeHtml(value){return String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));}

document.addEventListener('click',e=>{
  const a=e.target.closest('[data-jump]');
  if(!a)return;
  e.preventDefault();
  selectTab(a.dataset.jump,true);
});

async function registerServiceWorker(){
  if(!('serviceWorker' in navigator))return;
  try{
    const r=await navigator.serviceWorker.register('service-worker.js?v=20260914-5',{updateViaCache:'none'});
    await r.update();
  }catch(e){console.error(e)}
}
loadSkiTrip();
registerServiceWorker();