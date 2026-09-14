async function loadAthenTrip(){
  const flightRoot=document.getElementById('flightContent');
  const infoRoot=document.getElementById('athenContent');
  try{
    const response=await fetch('data/athen-2026.json?v=20260914-2',{cache:'no-store'});
    if(!response.ok)throw new Error('Athen-data kunne ikke hentes');
    const data=await response.json();
    document.getElementById('tripTitle').textContent=data.trip.title;
    document.getElementById('tripSubtitle').textContent=data.trip.subtitle;
    document.getElementById('tripStatus').textContent=data.trip.status;
    document.getElementById('tripTravelers').textContent=data.trip.travelers;

    flightRoot.innerHTML=(data.flights||[]).map(flight=>`<article class="flight-card"><h2>✈️ ${escapeHtml(flight.direction)}</h2><div class="flight-date">${formatDate(flight.date)}</div><div class="flight-times"><div class="flight-time">${escapeHtml(flight.departureTime)}</div><div class="flight-duration">${escapeHtml(flight.duration)}</div><div class="flight-time flight-arrival">${escapeHtml(flight.arrivalTime)}</div></div><div class="flight-route"><div>${escapeHtml(flight.from)}</div><div>${escapeHtml(flight.to)}</div></div></article>`).join('');

    const blocks=[];
    if(data.sections?.length)blocks.push(renderGroup('Overblik','🧭',data.sections));
    if(data.transport?.length)blocks.push(renderGroup('Transport','🚇',data.transport));
    if(data.museums?.length)blocks.push(renderGroup('Museer & seværdigheder','🏛️',data.museums));
    if(data.senior?.length)blocks.push(renderGroup('Senior & rabatter','🪪',data.senior));
    if(data.restaurants?.length)blocks.push(renderGroup('Spisesteder','🍽️',data.restaurants));
    if(data.suggestedPlan?.length)blocks.push(renderGroup('Forslag til dagene','📅',data.suggestedPlan));

    if(data.trip.sourceNote){
      blocks.push(`<article class="athen-card source-card"><div class="athen-icon" aria-hidden="true">✅</div><h2>Kvalitetssikring</h2><p>${escapeHtml(data.trip.sourceNote)}</p></article>`);
    }
    infoRoot.innerHTML=blocks.join('');
  }catch(error){
    console.error(error);
    flightRoot.innerHTML='<article class="flight-card"><h2>Data kunne ikke indlæses</h2><p>Genindlæs siden og prøv igen.</p></article>';
    infoRoot.innerHTML='';
  }
}

function renderGroup(title,icon,items){
  const cards=items.map(item=>{
    const heading=item.url
      ? `<h2><a class="athen-title-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)} ↗</a></h2>`
      : `<h2>${escapeHtml(item.title)}</h2>`;
    return `<article class="athen-card"><div class="athen-icon" aria-hidden="true">${escapeHtml(item.icon||'ℹ️')}</div>${heading}<p>${escapeHtml(item.text||'')}</p></article>`;
  }).join('');
  return `<section class="athen-group"><div class="group-heading"><span aria-hidden="true">${escapeHtml(icon)}</span><h2>${escapeHtml(title)}</h2></div><div class="athen-grid">${cards}</div></section>`;
}

function formatDate(value){
  return new Intl.DateTimeFormat('da-DK',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date(`${value}T12:00:00`));
}

function escapeHtml(value){
  return String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

loadAthenTrip();
