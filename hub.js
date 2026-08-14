async function loadTrips(){
  const grid=document.getElementById('tripGrid');
  try{
    const response=await fetch('data/trips.json',{cache:'no-store'});
    if(!response.ok)throw new Error('Rejsedata kunne ikke hentes');
    const data=await response.json();
    const trips=Array.isArray(data.trips)?data.trips:[];
    grid.innerHTML=trips.sort((a,b)=>a.slot-b.slot).map(renderTrip).join('');
  }catch(error){
    console.error(error);
    grid.innerHTML='<div class="error"><strong>Rejserne kunne ikke indlæses.</strong><br>Prøv at genindlæse siden.</div>';
  }
}

function renderTrip(trip){
  const active=trip.active&&trip.target;
  const className=`trip-card ${active?'active':'reserve'}`;
  const content=`<span class="trip-icon" aria-hidden="true">${escapeHtml(trip.icon||'＋')}</span><h3>${escapeHtml(trip.title||'Ny rejse')}</h3><p>${escapeHtml(trip.subtitle||'Ledig plads')}</p><span class="trip-status">${escapeHtml(trip.status||'Reserve')}</span>`;
  if(!active)return `<div class="${className}" data-slot="${Number(trip.slot)||0}" aria-disabled="true">${content}</div>`;
  return `<a class="${className}" data-slot="${Number(trip.slot)||0}" href="${targetFor(trip.target)}" aria-label="Åbn ${escapeHtml(trip.title)}">${content}</a>`;
}

function targetFor(target){
  if(target==='antwerpen')return 'antwerpen.html';
  if(target==='interrail')return 'interrail.html';
  return '#';
}

function escapeHtml(value){
  return String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

loadTrips();