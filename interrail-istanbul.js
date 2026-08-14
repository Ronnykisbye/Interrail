async function loadPlan(){
  const outbound=document.getElementById('outboundRoute');
  try{
    const response=await fetch('data/interrail-istanbul.json',{cache:'no-store'});
    if(!response.ok)throw new Error('Interrail-plan kunne ikke hentes');
    const data=await response.json();
    renderHeader(data.trip);
    outbound.innerHTML=data.outbound.map(renderRoute).join('');
    document.getElementById('returnRoute').innerHTML=data.return.map(renderRoute).join('');
    document.getElementById('principles').innerHTML=data.principles.map((text,index)=>`<div class="principle"><b>${index+1}</b><span>${escapeHtml(text)}</span></div>`).join('');
    document.getElementById('sourceLinks').innerHTML=data.sources.map(source=>`<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)} ↗</a>`).join('');
  }catch(error){
    console.error(error);
    outbound.innerHTML='<article class="route-card"><div class="route-no">!</div><div class="route-main"><h3>Planen kunne ikke indlæses</h3><p>Prøv at genindlæse siden.</p></div></article>';
  }
}

function renderHeader(trip){
  document.getElementById('tripTitle').textContent=trip.title;
  document.getElementById('tripSubtitle').textContent=trip.subtitle;
  document.getElementById('dateStatus').textContent=trip.dateStatus;
  document.getElementById('planningStatus').textContent=trip.planningStatus;
  document.getElementById('krakowStay').textContent=`${trip.krakowNights} nætter`;
  document.getElementById('istanbulStay').textContent=`${trip.istanbulNights} nætter`;
}

function renderRoute(item){
  const stay=item.stay?`<span class="pill stay">${escapeHtml(item.stay)}</span>`:'';
  const note=item.note?`<p>${escapeHtml(item.note)}</p>`:'';
  return `<article class="route-card"><div class="route-no">${Number(item.order)||''}</div><div class="route-main"><h3>${escapeHtml(item.from)} → ${escapeHtml(item.to)}</h3><div class="route-meta"><span class="pill">${escapeHtml(item.mode)}</span>${stay}<span class="pill status-pill">${escapeHtml(item.status)}</span></div>${note}</div></article>`;
}

function escapeHtml(value){
  return String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

loadPlan();