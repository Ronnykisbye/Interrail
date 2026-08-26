async function loadAntwerpen(){
  const root=document.getElementById('antwerpenContent');
  try{
    const response=await fetch('data/antwerpen.json?v=20260826-4',{cache:'no-store'});
    if(!response.ok)throw new Error('Antwerpen-data kunne ikke hentes');
    const data=await response.json();
    renderHero(data.trip);
    root.innerHTML=data.sections.map(section=>renderSection(section,data.trip,data.outboundHotel,data.hotel,data.returnHotel,data.alternativeReturnHotel,data.links||[])).join('');
  }catch(error){
    console.error(error);
    root.innerHTML='<article class="section-card"><h2>Data kunne ikke indlæses</h2><p>Genindlæs siden og prøv igen.</p></article>';
  }
}

function renderHero(trip){
  document.getElementById('tripTitle').textContent=trip.title;
  document.getElementById('tripSubtitle').textContent=trip.subtitle;
  document.getElementById('tripStatus').textContent=trip.status;
  document.getElementById('tripVehicle').textContent=trip.vehicle;
}

function renderSection(section,trip,outboundHotel,hotel,returnHotel,alternativeReturnHotel,links){
  if(section.id==='outboundHotel')return renderStayHotel(section,outboundHotel);
  if(section.id==='hotel')return renderHotel(section,hotel);
  if(section.id==='returnHotel')return renderStayHotel(section,returnHotel);
  if(section.id==='alternativeReturnHotel')return renderStayHotel(section,alternativeReturnHotel);
  if(section.id==='route')return renderRoute(section,trip);
  if(section.id==='links')return renderLinks(section,links);
  return `<article class="section-card"><div class="section-icon" aria-hidden="true">${escapeHtml(section.icon)}</div><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.text)}</p></article>`;
}

function renderRoute(section,trip){
  const actions=[];
  if(trip.routeUrl)actions.push(`<a href="${escapeHtml(trip.routeUrl)}" target="_blank" rel="noopener noreferrer">Udrejse i Google Maps ↗</a>`);
  if(trip.returnRouteUrl)actions.push(`<a href="${escapeHtml(trip.returnRouteUrl)}" target="_blank" rel="noopener noreferrer">Hjemrejse via Bremen ↗</a>`);
  if(trip.alternativeReturnRouteUrl)actions.push(`<a href="${escapeHtml(trip.alternativeReturnRouteUrl)}" target="_blank" rel="noopener noreferrer">Alternativ hjemrejse via Kiel ↗</a>`);
  return `<article class="section-card"><div class="section-icon" aria-hidden="true">${escapeHtml(section.icon)}</div><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.text)}</p>${trip.outboundNote?`<p>${escapeHtml(trip.outboundNote)}</p>`:''}${trip.returnNote?`<p>${escapeHtml(trip.returnNote)}</p>`:''}${actions.length?`<div class="hotel-actions">${actions.join('')}</div>`:''}</article>`;
}

function renderHotel(section,hotel){
  const actions=[];
  if(hotel.website)actions.push(`<a href="${escapeHtml(hotel.website)}" target="_blank" rel="noopener noreferrer">Hotellets hjemmeside ↗</a>`);
  if(hotel.mapUrl)actions.push(`<a href="${escapeHtml(hotel.mapUrl)}" target="_blank" rel="noopener noreferrer">Åbn hotel i kort ↗</a>`);
  return `<article class="section-card hotel-card"><div class="section-icon" aria-hidden="true">${escapeHtml(section.icon)}</div><h2>${escapeHtml(section.title)} · ${escapeHtml(hotel.name)}</h2><p>${escapeHtml(hotel.address)}</p><div class="hotel-details"><div class="hotel-detail"><small>Indtjekning</small><strong>${formatDate(hotel.checkIn)}</strong></div><div class="hotel-detail"><small>Udtjekning</small><strong>${formatDate(hotel.checkOut)}</strong></div><div class="hotel-detail"><small>Ophold</small><strong>${hotel.nights} nætter</strong></div><div class="hotel-detail"><small>Værelse</small><strong>${escapeHtml(hotel.room)}</strong></div><div class="hotel-detail"><small>Samlet pris</small><strong>${escapeHtml(hotel.totalPriceDkk)}</strong></div><div class="hotel-detail"><small>Betales på hotel</small><strong>${escapeHtml(hotel.payAtPropertyDkk)}</strong></div></div>${actions.length?`<div class="hotel-actions">${actions.join('')}</div>`:''}</article>`;
}

function renderStayHotel(section,hotel){
  if(!hotel)return '';
  const actions=[];
  if(hotel.bookingInfoUrl)actions.push(`<a href="${escapeHtml(hotel.bookingInfoUrl)}" target="_blank" rel="noopener noreferrer">Hotelinfo ↗</a>`);
  if(hotel.website)actions.push(`<a href="${escapeHtml(hotel.website)}" target="_blank" rel="noopener noreferrer">Hotellets hjemmeside ↗</a>`);
  if(hotel.mapUrl)actions.push(`<a href="${escapeHtml(hotel.mapUrl)}" target="_blank" rel="noopener noreferrer">Åbn hotel i kort ↗</a>`);
  const features=Array.isArray(hotel.features)&&hotel.features.length?`<p><strong>Faciliteter:</strong> ${hotel.features.map(escapeHtml).join(' · ')}</p>`:'';
  const status=hotel.status?`<p><strong>Status:</strong> ${escapeHtml(hotel.status)}</p>`:'';
  return `<article class="section-card hotel-card"><div class="section-icon" aria-hidden="true">${escapeHtml(section.icon)}</div><h2>${escapeHtml(section.title)} · ${escapeHtml(hotel.name)}</h2><p>${escapeHtml(hotel.address||hotel.city||'')}</p><div class="hotel-details"><div class="hotel-detail"><small>Indtjekning</small><strong>${formatDate(hotel.checkIn)}${hotel.checkInTime?` · ${escapeHtml(hotel.checkInTime)}`:''}</strong></div><div class="hotel-detail"><small>Udtjekning</small><strong>${formatDate(hotel.checkOut)}${hotel.checkOutTime?` · ${escapeHtml(hotel.checkOutTime)}`:''}</strong></div><div class="hotel-detail"><small>Ophold</small><strong>${hotel.nights} ${hotel.nights===1?'nat':'nætter'}</strong></div><div class="hotel-detail"><small>Værelse</small><strong>${escapeHtml(hotel.room)}</strong></div></div>${status}${features}${hotel.note?`<p>${escapeHtml(hotel.note)}</p>`:''}${actions.length?`<div class="hotel-actions">${actions.join('')}</div>`:''}</article>`;
}

function renderLinks(section,links){
  const items=links.length?links.map(link=>`<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">${escapeHtml(link.icon||'🔗')}</span><span><strong>${escapeHtml(link.title)}</strong><small>${escapeHtml(link.subtitle||'')}</small></span></a>`).join(''):'<p>Ingen links endnu.</p>';
  return `<article class="section-card"><div class="section-icon" aria-hidden="true">${escapeHtml(section.icon)}</div><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.text)}</p><div class="hotel-actions">${items}</div></article>`;
}

function formatDate(value){
  return new Intl.DateTimeFormat('da-DK',{day:'numeric',month:'long',year:'numeric'}).format(new Date(`${value}T12:00:00`));
}

function escapeHtml(value){
  return String(value??'').replace(/[&<>'\"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[ch]));
}

loadAntwerpen();