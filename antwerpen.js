async function loadAntwerpen(){
  const root=document.getElementById('antwerpenContent');
  try{
    const response=await fetch('data/antwerpen.json',{cache:'no-store'});
    if(!response.ok)throw new Error('Antwerpen-data kunne ikke hentes');
    const data=await response.json();
    renderHero(data.trip);
    root.innerHTML=data.sections.map(section=>renderSection(section,data.hotel)).join('');
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

function renderSection(section,hotel){
  if(section.id==='hotel')return renderHotel(section,hotel);
  return `<article class="section-card"><div class="section-icon" aria-hidden="true">${escapeHtml(section.icon)}</div><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.text)}</p></article>`;
}

function renderHotel(section,hotel){
  return `<article class="section-card hotel-card"><div class="section-icon" aria-hidden="true">${escapeHtml(section.icon)}</div><h2>${escapeHtml(section.title)} · ${escapeHtml(hotel.name)}</h2><p>${escapeHtml(hotel.address)}</p><div class="hotel-details"><div class="hotel-detail"><small>Indtjekning</small><strong>${formatDate(hotel.checkIn)}</strong></div><div class="hotel-detail"><small>Udtjekning</small><strong>${formatDate(hotel.checkOut)}</strong></div><div class="hotel-detail"><small>Ophold</small><strong>${hotel.nights} nætter</strong></div><div class="hotel-detail"><small>Værelse</small><strong>${escapeHtml(hotel.room)}</strong></div><div class="hotel-detail"><small>Samlet pris</small><strong>${escapeHtml(hotel.totalPriceDkk)}</strong></div><div class="hotel-detail"><small>Betales på hotel</small><strong>${escapeHtml(hotel.payAtPropertyDkk)}</strong></div></div><div class="hotel-actions"><a href="${escapeHtml(hotel.mapUrl)}" target="_blank" rel="noopener noreferrer">Åbn hotel i kort ↗</a></div></article>`;
}

function formatDate(value){
  return new Intl.DateTimeFormat('da-DK',{day:'numeric',month:'long',year:'numeric'}).format(new Date(`${value}T12:00:00`));
}

function escapeHtml(value){
  return String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

loadAntwerpen();