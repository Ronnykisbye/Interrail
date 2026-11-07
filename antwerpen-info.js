async function loadInfo(){
  const page=document.body.dataset.page;
  const root=document.getElementById('pageContent');
  try{
    const r=await fetch('data/antwerpen.json?v=20261107-1',{cache:'no-store'});
    if(!r.ok)throw new Error('Data kunne ikke hentes');
    const d=await r.json();
    if(page==='days')renderDays(root,d);
    if(page==='routes')renderRoutes(root,d);
    if(page==='hotels')renderHotels(root,d);
    if(page==='practical')renderPractical(root,d);
  }catch(e){
    console.error(e);
    root.innerHTML='<article class="info-card"><h2>Kunne ikke indlæse siden</h2><p>Genindlæs og prøv igen.</p></article>';
  }
}
function renderDays(root,d){
  root.className='cards';
  root.innerHTML=(d.dailyPlan||[]).map(day=>`<article class="day-card"><h2>${esc(day.title)}</h2><p><strong>${fmt(day.date)}</strong></p><div class="day-list">${(day.items||[]).map(x=>`<div class="day-line">${esc(x)}</div>`).join('')}</div></article>`).join('');
}
function renderRoutes(root,d){
  const intro=`<div class="warning"><strong>${esc(d.routePlan?.status||'Foreløbig')}</strong><br>${esc(d.routePlan?.qaNote||'')}</div>`;
  const cards=(d.driveDays||[]).map(day=>`<article class="route-card"><span class="route-status">Køredag ${day.day} · ${esc(day.status||'Foreløbig')}</span><h2>${esc(day.from)} → ${esc(day.to)}</h2><p><strong>${fmt(day.date)}</strong></p><div class="stop-list">${day.departureTime?`<p><b>Afgang:</b> kl. ${esc(day.departureTime)}</p>`:''}${Array.isArray(day.rules)&&day.rules.length?`<div class="warning"><b>Regler:</b><br>${day.rules.map(x=>`• ${esc(x)}`).join('<br>')}</div>`:''}${(day.stops||[]).map((s,i)=>`<div class="stop-line"><strong>${i+1}. ${esc(s.name)}</strong>${s.address?`<p>${esc(s.address)}</p>`:''}${s.legDistance?`<p><b>Afstand fra forrige punkt:</b> ${esc(s.legDistance)}</p>`:''}${s.legDriveTime?`<p><b>Køretid fra forrige punkt:</b> ${esc(s.legDriveTime)}</p>`:''}${s.chargeTime?`<p><b>Ladning:</b> ${esc(s.chargeTime)}</p>`:''}${s.note?`<p>${esc(s.note)}</p>`:''}</div>`).join('')}</div><a href="${esc(day.mapUrl)}" target="_blank" rel="noopener noreferrer">Åbn i Google Maps ↗</a></article>`).join('');
  const hotel=(d.routePlan?.hotelCharging||[]).map(h=>`<article class="info-card"><h2>${esc(h.hotel)}</h2><p><strong>${esc(h.status)}</strong></p><p>${esc(h.text)}</p></article>`).join('');
  root.innerHTML=intro+`<section class="cards">${cards}</section><section class="sub-hero"><h1>Opladning ved hoteller</h1></section><section class="cards">${hotel}</section>`;
}
function renderHotels(root,d){
  const hotels=[
    ['Hotel Heideblick an der Lüneburger Heide',d.outboundHotel],
    ['Prize by Radisson, Antwerp City',d.hotel],
    ['Garner Hotel Kiel - Akademie by IHG',d.returnHotel]
  ];
  root.className='hotel-grid';
  root.innerHTML=hotels.map(([name,h])=>`<article class="hotel-card"><h2>${esc(name)}</h2><small>${esc(h.address||'')}</small><p><b>Check-in:</b> ${fmt(h.checkIn)}${h.checkInTime?' · '+esc(h.checkInTime):''}</p><p><b>Check-out:</b> ${fmt(h.checkOut)}${h.checkOutTime?' · '+esc(h.checkOutTime):''}</p><p><b>Ophold:</b> ${esc(h.nights)} ${h.nights===1?'nat':'nætter'}</p>${h.room?`<p><b>Værelse:</b> ${esc(h.room)}</p>`:''}<div>${h.website?`<a href="${esc(h.website)}" target="_blank" rel="noopener noreferrer">Hotellets hjemmeside ↗</a>`:''} ${h.mapUrl?`<a href="${esc(h.mapUrl)}" target="_blank" rel="noopener noreferrer">Google Maps ↗</a>`:''}</div></article>`).join('');
}
function renderPractical(root,d){
  const permits=d.permits||{};
  const links=(d.links||[]).map(l=>`<a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer"><span>${esc(l.icon||'🔗')}</span><span>${esc(l.title)}</span></a>`).join('');
  root.innerHTML=`<section class="cards"><article class="info-card"><h2>🎟️ ${esc(d.event?.title||'Koncert')}</h2><p><b>Dato:</b> ${fmt(d.event?.date)} kl. ${esc(d.event?.time||'')}</p><p><b>Sted:</b> ${esc(d.event?.venue||'')}</p><p>${esc(d.event?.address||'')}</p>${d.event?.mapUrl?`<a class="action" href="${esc(d.event.mapUrl)}" target="_blank" rel="noopener noreferrer">Åbn Lotto Arena i Google Maps ↗</a>`:''}</article><article class="info-card"><h2>🛂 Tilladelser & miljø</h2><p>${esc(permits.antwerpLez||'')}</p><p>${esc(permits.germanySticker||'')}</p><p>${esc(permits.privacyNote||'')}</p></article></section><section class="sub-hero"><h1>Nyttige links</h1></section><div class="link-list">${links}</div>`;
}
function fmt(v){if(!v)return'';return new Intl.DateTimeFormat('da-DK',{day:'numeric',month:'long',year:'numeric'}).format(new Date(v+'T12:00:00'))}
function esc(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
loadInfo();