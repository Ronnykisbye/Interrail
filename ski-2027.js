async function loadSkiTrip(){
  const root=document.getElementById('skiContent');
  try{
    const response=await fetch('data/ski-2027.json?v=20260827-1',{cache:'no-store'});
    if(!response.ok)throw new Error('Skiferiedata kunne ikke hentes');
    const data=await response.json();
    document.getElementById('skiTitle').textContent=data.trip.title;
    document.getElementById('skiSubtitle').textContent=data.trip.subtitle;
    document.getElementById('skiStatus').textContent=data.trip.status;
    document.getElementById('skiCandidate').textContent=data.trip.candidate;
    root.innerHTML=data.planning.map(item=>`<article class="ski-card"><div class="ski-icon" aria-hidden="true">${escapeHtml(item.icon)}</div><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.text)}</p></article>`).join('');
  }catch(error){
    console.error(error);
    root.innerHTML='<article class="ski-card"><h2>Data kunne ikke indlæses</h2><p>Genindlæs siden og prøv igen.</p></article>';
  }
}

function escapeHtml(value){
  return String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

loadSkiTrip();
