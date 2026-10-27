async function loadAntwerpen(){
  const root=document.getElementById('antwerpenContent');
  try{
    const response=await fetch('data/antwerpen.json?v=20261027-1',{cache:'no-store'});
    if(!response.ok)throw new Error('Antwerpen-data kunne ikke hentes');
    const data=await response.json();
    renderHero(data.trip);
    renderDrivePlan(data.routePlan||{},data.driveDays||[]);
    renderJourney(data.journey||[]);
    root.innerHTML=data.sections.map(section=>renderSection(section,data.trip,data.outboundHotel,data.hotel,data.returnHotel,null,data.links||[])).join('');
  }catch(error){
    console.error(error);
    root.innerHTML='<article class="section-card"><h2>Data kunne ikke indlæses</h2><p>Genindlæs siden og prøv igen.</p></article>';
  }
}

function renderDrivePlan(plan,days){
  const root=document.getElementById('drivePlan');
  if(!root)return;
  if(!days.length){root.innerHTML='';return;}
  const overview=days.map(day=>`<div class="route-day-line"><span class="route-day-badge">Dag ${day.day}</span><strong>${escapeHtml(day.from)}</strong><span aria-hidden="true">→</span><strong>${escapeHtml(day.to)}</strong></div>`).join('');
  const cards=days.map(day=>`<article class="drive-day-card">
    <div class="drive-day-head"><div><small>KØREDAG ${day.day} · ${formatDate(day.date)}</small><h3>${escapeHtml(day.from)} → ${escapeHtml(day.to)}</h3></div><span class="route-status">${escapeHtml(day.status||'Foreløbig')}</span></div>
    <div class="stop-list">${(day.stops||[]).map((stop,index)=>`<div class="stop-row ${escapeHtml(stop.type||'')}"><div class="stop-index">${index+1}</div><div><strong>${escapeHtml(stop.name)}</strong>${stop.address?`<small>${escapeHtml(stop.address)}</small>`:''}${stop.chargeTime?`<p><b>Forventet ladetid:</b> ${escapeHtml(stop.chargeTime)}</p>`:''}${stop.facilities?`<p><b>Pause:</b> ${escapeHtml(stop.facilities)}</p>`:''}${stop.note?`<p>${escapeHtml(stop.note)}</p>`:''}</div></div>`).join('')}</div>
    <a class="drive-nav" href="${escapeHtml(day.mapUrl)}" target="_blank" rel="noopener noreferrer">🗺️ Åbn køredag ${day.day} i Google Maps ↗</a>
  </article>`).join('');
  const hotelCharging=(plan.hotelCharging||[]).map(item=>`<div class="hotel-charge-item"><strong>${escapeHtml(item.hotel)}</strong><span>${escapeHtml(item.status)}</span><p>${escapeHtml(item.text)}</p></div>`).join('');
  root.innerHTML=`<section class="route-plan-card">
    <div class="route-plan-title"><div><small>4 KØREDAGE · SAMLET RUTEKORT</small><h2>Helsingør → Jesteburg → Antwerpen → Kiel → Helsingør</h2></div><span class="qa-pill">${escapeHtml(plan.status||'Foreløbig')}</span></div>
    <div class="route-map-schematic" aria-label="Skematisk rutekort">${overview}</div>
    <div class="route-rules"><p><strong>Bil:</strong> ${escapeHtml(plan.vehicle||'')}</p><p><strong>Start:</strong> ${escapeHtml(plan.startSoc||'')}</p><p><strong>Rækkevidde:</strong> ${escapeHtml(plan.statedRange||'')}</p><p><strong>Pausegrænse:</strong> ${escapeHtml(plan.maxInterval||'')}</p><p><strong>Ladning:</strong> ${escapeHtml(plan.chargingPriority||'')}</p><p><strong>Mål:</strong> ${escapeHtml(plan.chargingTarget||'')}</p></div>
    <p class="charge-note">${escapeHtml(plan.chargeTimeNote||'')}</p>
    <p class="qa-note">${escapeHtml(plan.qaNote||'')}</p>
  </section>
  <div class="drive-days-grid">${cards}</div>
  <section class="hotel-charge-card"><h2>🔌 Opladning ved hoteller</h2><div class="hotel-charge-grid">${hotelCharging}</div></section>`;
}

function renderJourney(journey){
  const root=document.getElementById('travelTimeline');
  if(!root)return;
  if(!journey.length){root.innerHTML='';return;}
  root.innerHTML=`<article class="journey-card"><div class="journey-heading"><span aria-hidden="true">🚗</span><div><small>REJSEPLAN</small><h2>Fra → til</h2></div></div><div class="journey-list">${journey.map((leg,index)=>`<div class="journey-leg"><div class="journey-date">${formatDate(leg.date)}</div><div class="journey-route"><strong>${escapeHtml(leg.from)}</strong><span aria-hidden="true">→</span><strong>${escapeHtml(leg.to)}</strong></div><p>${escapeHtml(leg.note||'')}</p>${index<journey.length-1?'<div class="journey-line" aria-hidden="true"></div>':''}</div>`).join('')}</div></article>`;
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
  if(section.id==='charging')return renderCharging(section,trip);
  if(section.id==='links')return renderLinks(section,links);
  return `<article class="section-card"><div class="section-icon" aria-hidden="true">${escapeHtml(section.icon)}</div><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.text)}</p></article>`;
}

function renderRoute(section,trip){
  const actions=[];
  if(trip.routeUrl)actions.push(`<a href="${escapeHtml(trip.routeUrl)}" target="_blank" rel="noopener noreferrer">Google Maps · Helsingør → Jesteburg ↗</a>`);
  if(trip.returnRouteUrl)actions.push(`<a href="${escapeHtml(trip.returnRouteUrl)}" target="_blank" rel="noopener noreferrer">Hjemrejse via Kiel ↗</a>`);
  return `<article class="section-card"><div class="section-icon" aria-hidden="true">${escapeHtml(section.icon)}</div><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.text)}</p>${trip.outboundNote?`<p>${escapeHtml(trip.outboundNote)}</p>`:''}${trip.returnNote?`<p>${escapeHtml(trip.returnNote)}</p>`:''}${actions.length?`<div class="hotel-actions">${actions.join('')}</div>`:''}</article>`;
}

function renderCharging(section,trip){
  const action=trip.ionityRouteUrl?`<div class="hotel-actions"><a href="${escapeHtml(trip.ionityRouteUrl)}" target="_blank" rel="noopener noreferrer">⚡ Åbn IONITY-ruten ↗</a></div>`:'';
  return `<article class="section-card"><div class="section-icon" aria-hidden="true">${escapeHtml(section.icon)}</div><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.text)}</p>${action}</article>`;
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
  return String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

loadAntwerpen();