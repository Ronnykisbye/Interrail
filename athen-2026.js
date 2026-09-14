async function loadAthenTrip(){
  const flightRoot=document.getElementById('flightContent');
  const infoRoot=document.getElementById('athenContent');
  try{
    const response=await fetch('data/athen-2026.json?v=20260914-1',{cache:'no-store'});
    if(!response.ok)throw new Error('Athen-data kunne ikke hentes');
    const data=await response.json();
    document.getElementById('tripTitle').textContent=data.trip.title;
    document.getElementById('tripSubtitle').textContent=data.trip.subtitle;
    document.getElementById('tripStatus').textContent=data.trip.status;
    document.getElementById('tripTravelers').textContent=data.trip.travelers;

    flightRoot.innerHTML=(data.flights||[]).map(flight=>`<article class="flight-card"><h2>✈️ ${escapeHtml(flight.direction)}</h2><div class="flight-date">${formatDate(flight.date)}</div><div class="flight-times"><div class="flight-time">${escapeHtml(flight.departureTime)}</div><div class="flight-duration">${escapeHtml(flight.duration)}</div><div class="flight-time flight-arrival">${escapeHtml(flight.arrivalTime)}</div></div><div class="flight-route"><div>${escapeHtml(flight.from)}</div><div>${escapeHtml(flight.to)}</div></div></article>`).join('');

    infoRoot.innerHTML=(data.sections||[]).map(item=>`<article class="athen-card"><div class="athen-icon" aria-hidden="true">${escapeHtml(item.icon)}</div><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.text)}</p></article>`).join('');
  }catch(error){
    console.error(error);
    flightRoot.innerHTML='<article class="flight-card"><h2>Data kunne ikke indlæses</h2><p>Genindlæs siden og prøv igen.</p></article>';
    infoRoot.innerHTML='';
  }
}

function formatDate(value){
  return new Intl.DateTimeFormat('da-DK',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date(`${value}T12:00:00`));
}

function escapeHtml(value){
  return String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

loadAthenTrip();
