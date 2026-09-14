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

    const folders=[];
    if(data.sections?.length)folders.push(renderFolder('Overblik','🧭',data.sections));
    if(data.transport?.length)folders.push(renderFolder('Transport','🚇',data.transport));
    if(data.museums?.length)folders.push(renderFolder('Museer & seværdigheder','🏛️',data.museums));
    if(data.senior?.length)folders.push(renderFolder('Senior & rabatter','🪪',data.senior));
    if(data.restaurants?.length)folders.push(renderFolder('Spisesteder','🍽️',data.restaurants));
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

function renderFolder(title,icon,items){
  const subfolders=items.map(item=>renderSubfolder(item)).join('');
  return `<details class="athen-folder"><summary><span class="folder-icon" aria-hidden="true">${escapeHtml(icon)}</span><span class="folder-title">${escapeHtml(title)}</span><span class="folder-count">${items.length}</span><span class="folder-arrow" aria-hidden="true">›</span></summary><div class="folder-body">${subfolders}</div></details>`;
}

function renderSubfolder(item){
  const externalLink=item.url
    ? `<a class="folder-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">Åbn officiel side ↗</a>`
    : '';
  return `<details class="athen-subfolder"><summary><span class="subfolder-icon" aria-hidden="true">${escapeHtml(item.icon||'ℹ️')}</span><span>${escapeHtml(item.title)}</span><span class="subfolder-arrow" aria-hidden="true">›</span></summary><div class="subfolder-body"><p>${escapeHtml(item.text||'')}</p>${externalLink}</div></details>`;
}

function formatDate(value){
  return new Intl.DateTimeFormat('da-DK',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date(`${value}T12:00:00`));
}

function escapeHtml(value){
  return String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

loadAthenTrip();
