async function loadGuide(){
  const key=document.body.dataset.guide;
  const root=document.getElementById('guideContent');
  try{
    const r=await fetch('data/antwerpen-guide.json?v=20261102-2',{cache:'no-store'});
    if(!r.ok)throw new Error('Guide-data kunne ikke hentes');
    const data=await r.json();
    const g=data[key];
    document.getElementById('pageTitle').textContent=g.title;
    document.getElementById('pageSubtitle').textContent=g.subtitle;
    document.getElementById('suggestion').textContent=g.suggestion;
    const count=document.getElementById('placeCount');
    if(count)count.textContent=`Alle udflugter · ${g.places.length} steder`;
    root.innerHTML=g.places.map(p=>`<article class="place-card"><h2>${esc(p.name)}</h2><small>${esc(p.address)}</small><p>${esc(p.text)}</p><a href="${esc(p.mapUrl)}" target="_blank" rel="noopener noreferrer">Åbn i Google Maps ↗</a></article>`).join('');
  }catch(e){
    console.error(e);
    root.innerHTML='<article class="info-card"><h2>Kunne ikke indlæse guiden</h2><p>Genindlæs siden og prøv igen.</p></article>';
  }
}
function esc(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
loadGuide();