async function loadAthenTrip(){
  const flightRoot=document.getElementById('flightContent');
  const infoRoot=document.getElementById('athenContent');
  try{
    const [tripResponse,foodResponse,stayResponse,practicalResponse]=await Promise.all([
      fetch('data/athen-2026.json?v=20260914-2',{cache:'no-store'}),
      fetch('data/athen-food.json?v=20260914-1',{cache:'no-store'}),
      fetch('data/athen-stay.json?v=20260914-2',{cache:'no-store'}),
      fetch('data/athen-practical.json?v=20260915-1',{cache:'no-store'})
    ]);
    if(!tripResponse.ok)throw new Error('Athen-data kunne ikke hentes');
    const data=await tripResponse.json();
    const foodData=foodResponse.ok?await foodResponse.json():{};
    const stayData=stayResponse.ok?await stayResponse.json():{};
    const practicalData=practicalResponse.ok?await practicalResponse.json():{};
    document.getElementById('tripTitle').textContent=data.trip.title;
    document.getElementById('tripSubtitle').textContent=data.trip.subtitle;
    document.getElementById('tripStatus').textContent=data.trip.status;
    document.getElementById('tripTravelers').textContent=data.trip.travelers;

    flightRoot.innerHTML=(data.flights||[]).map(flight=>`<article class="flight-card"><h2>✈️ ${escapeHtml(flight.direction)}</h2><div class="flight-date">${formatDate(flight.date)}</div><div class="flight-times"><div class="flight-time">${escapeHtml(flight.departureTime)}</div><div class="flight-duration">${escapeHtml(flight.duration)}</div><div class="flight-time flight-arrival">${escapeHtml(flight.arrivalTime)}</div></div><div class="flight-route"><div>${escapeHtml(flight.from)}</div><div>${escapeHtml(flight.to)}</div></div></article>`).join('');

    const folders=[];
    if(data.sections?.length)folders.push(renderFolder('Overblik','🧭',data.sections));
    if(stayData.items?.length)folders.push(renderStayFolder(stayData));
    if(data.transport?.length)folders.push(renderFolder('Transport','🚇',data.transport));
    if(practicalData.taxi?.length)folders.push(renderFolder('Taxa & betaling','🚕',practicalData.taxi));
    if(practicalData.publicTransportTips?.length)folders.push(renderFolder('Gode råd i offentlig transport','🧠',practicalData.publicTransportTips));
    if(data.museums?.length)folders.push(renderFolder('Museer & seværdigheder','🏛️',data.museums));
    if(data.senior?.length)folders.push(renderFolder('Senior & rabatter','🪪',data.senior));
    const restaurants=foodData.restaurants?.length?foodData.restaurants:data.restaurants;
    if(restaurants?.length)folders.push(renderFolder('Spisesteder','🍽️',restaurants));
    if(data.suggestedPlan?.length)folders.push(renderFolder('Forslag til dagene','📅',data.suggestedPlan));

    if(data.trip.sourceNote){
      folders.push(`<details class="athen-folder quality-folder"><summary><span class="folder-icon" aria-hidden="true">✅</span><span class="folder-title">Kvalitetssikring</span><span class="folder-arrow" aria-hidden="true">›</span></summary><div class="folder-body"><p class="quality-note">${escapeHtml(data.trip.sourceNote)}</p></div></details>`);
    }
    infoRoot.innerHTML=folders.join('');
  }catch(error){
    console.error(error);
    flightRoot.innerHTML='<article class="flight-card"><h2>Data kunne ikke indlæses</h2><p>Genindlæs siden og prøv igen.</p></article>';
    infoRoot.innerHTML='';
  }
}

function renderStayFolder(stayData){
  const stay=stayData.stay||{};
  const header=`${stay.name||'Bolig'}${stay.status?` · ${stay.status}`:''}`;
  const details=[];
  if(stay.type)details.push(stay.type);
  if(stay.area)details.push(stay.area);
  if(stay.guests)details.push(stay.guests);
  if(stay.bedroom)details.push(stay.bedroom);
  if(stay.bed)details.push(stay.bed);
  if(stay.bathroom)details.push(stay.bathroom);
  const stayLink=stay.airbnbUrl?`<a class="folder-link" href="${escapeHtml(stay.airbnbUrl)}" target="_blank" rel="noopener noreferrer">Åbn Airbnb-opslaget ↗</a>`:'';
  const note=stay.note?`<p class="quality-note">${escapeHtml(stay.note)}</p>`:'';
  const subfolders=(stayData.items||[]).map(item=>renderSubfolder(item)).join('');
  return `<details class="athen-folder"><summary><span class="folder-icon" aria-hidden="true">🏠</span><span class="folder-title">Bolig · Koukaki</span><span class="folder-count">${stayData.items.length}</span><span class="folder-arrow" aria-hidden="true">›</span></summary><div class="folder-body"><article class="stay-summary"><strong>${escapeHtml(header)}</strong><p>${escapeHtml(details.join(' · '))}</p>${stayLink}${note}</article>${subfolders}</div></details>`;
}

function renderFolder(title,icon,items){
  const subfolders=items.map(item=>renderSubfolder(item)).join('');
  return `<details class="athen-folder"><summary><span class="folder-icon" aria-hidden="true">${escapeHtml(icon)}</span><span class="folder-title">${escapeHtml(title)}</span><span class="folder-count">${items.length}</span><span class="folder-arrow" aria-hidden="true">›</span></summary><div class="folder-body">${subfolders}</div></details>`;
}

function renderSubfolder(item){
  const externalLink=item.url
    ? `<a class="folder-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">Åbn officiel side ↗</a>`
    : '';
  const places=Array.isArray(item.places)&&item.places.length
    ? `<div class="place-links"><strong>Steder hvor I kan prøve retten:</strong>${item.places.map(place=>`<a class="folder-link place-link" href="${escapeHtml(place.url)}" target="_blank" rel="noopener noreferrer">📍 ${escapeHtml(place.title)} ↗</a>`).join('')}</div>`
    : '';
  return `<details class="athen-subfolder"><summary><span class="subfolder-icon" aria-hidden="true">${escapeHtml(item.icon||'ℹ️')}</span><span>${escapeHtml(item.title)}</span><span class="subfolder-arrow" aria-hidden="true">›</span></summary><div class="subfolder-body"><p>${escapeHtml(item.text||'')}</p>${externalLink}${places}</div></details>`;
}

function formatDate(value){
  return new Intl.DateTimeFormat('da-DK',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date(`${value}T12:00:00`));
}

function escapeHtml(value){
  return String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

loadAthenTrip();
