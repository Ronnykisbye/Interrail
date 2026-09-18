async function loadAthenTrip(){
  const flightRoot=document.getElementById('flightContent');
  const infoRoot=document.getElementById('athenContent');
  try{
    const [tripResponse,foodResponse,stayResponse,practicalResponse,ticketsResponse]=await Promise.all([
      fetch('data/athen-2026.json?v=20260918-1',{cache:'no-store'}),
      fetch('data/athen-food.json?v=20260918-1',{cache:'no-store'}),
      fetch('data/athen-stay.json?v=20260918-1',{cache:'no-store'}),
      fetch('data/athen-practical.json?v=20260918-1',{cache:'no-store'}),
      fetch('data/athen-tickets.json?v=20260918-1',{cache:'no-store'})
    ]);
    if(!tripResponse.ok)throw new Error('Athen-data kunne ikke hentes');
    const data=await tripResponse.json();
    const foodData=foodResponse.ok?await foodResponse.json():{};
    const stayData=stayResponse.ok?await stayResponse.json():{};
    const practicalData=practicalResponse.ok?await practicalResponse.json():{};
    const ticketsData=ticketsResponse.ok?await ticketsResponse.json():{};

    document.getElementById('tripTitle').textContent=data.trip.title;
    document.getElementById('tripSubtitle').textContent=data.trip.subtitle;
    document.getElementById('tripStatus').textContent=data.trip.status;
    document.getElementById('tripTravelers').textContent=data.trip.travelers;

    flightRoot.innerHTML=(data.flights||[]).map(flight=>`<article class="flight-card"><h2>✈️ ${escapeHtml(flight.direction)}</h2><div class="flight-date">${formatDate(flight.date)}</div><div class="flight-times"><div class="flight-time">${escapeHtml(flight.departureTime)}</div><div class="flight-duration">${escapeHtml(flight.duration)}</div><div class="flight-time flight-arrival">${escapeHtml(flight.arrivalTime)}</div></div><div class="flight-route"><div>${escapeHtml(flight.from)}</div><div>${escapeHtml(flight.to)}</div></div></article>`).join('');

    const overviewSections=(data.sections||[]).map(section=>{
      if(section.title==='Bolig'&&stayData.stay){
        return {...section,text:`Booket bolig: ${stayData.stay.name||'Helichrysum Studio'} · ${stayData.stay.area||'Koukaki, Athen'} · 21.–25. september 2026. Placeringen i appen er kun omtrentligt angivet; præcis adresse offentliggøres ikke.`};
      }
      return section;
    });

    const menuModel=[];
    if(overviewSections.length)menuModel.push({title:'Overblik',icon:'🧭',items:overviewSections});
    if(stayData.items?.length)menuModel.push({title:'Bolig · Koukaki',icon:'🏠',items:stayData.items,stay:stayData.stay});
    if(data.transport?.length)menuModel.push({title:'Transport',icon:'🚇',items:data.transport});
    if(practicalData.taxi?.length)menuModel.push({title:'Taxa & betaling',icon:'🚕',items:practicalData.taxi});
    if(practicalData.publicTransportTips?.length)menuModel.push({title:'Gode råd i offentlig transport',icon:'🧠',items:practicalData.publicTransportTips});
    if(ticketsData.items?.length)menuModel.push({title:'Billetter & ture',icon:'🎟️',items:ticketsData.items});
    if(data.museums?.length)menuModel.push({title:'Museer & seværdigheder',icon:'🏛️',items:data.museums});
    if(data.senior?.length)menuModel.push({title:'Senior & rabatter',icon:'🪪',items:data.senior});
    const restaurants=foodData.restaurants?.length?foodData.restaurants:data.restaurants;
    if(restaurants?.length)menuModel.push({title:'Spisesteder',icon:'🍽️',items:restaurants});
    if(data.suggestedPlan?.length)menuModel.push({title:'Forslag til dagene',icon:'📅',items:data.suggestedPlan});

    infoRoot.innerHTML=menuModel.map((menu,index)=>renderFolder(menu,index)).join('');
    if(data.trip.sourceNote)infoRoot.insertAdjacentHTML('beforeend',renderQualityFolder(data.trip.sourceNote));

    bindAccordion(infoRoot);
    runMenuQA(infoRoot,menuModel);
  }catch(error){
    console.error(error);
    flightRoot.innerHTML='<article class="flight-card"><h2>Data kunne ikke indlæses</h2><p>Genindlæs siden og prøv igen.</p></article>';
    infoRoot.innerHTML='';
  }
}

function renderFolder(menu,index){
  const id=`menu-${index}`;
  const staySummary=menu.stay?renderStaySummary(menu.stay):'';
  const subfolders=menu.items.map((item,itemIndex)=>renderSubfolder(item,index,itemIndex)).join('');
  return `<section class="athen-folder" data-menu-title="${escapeHtml(menu.title)}" data-expected-count="${menu.items.length}"><button type="button" class="folder-toggle" aria-expanded="false" aria-controls="${id}"><span class="folder-icon" aria-hidden="true">${escapeHtml(menu.icon)}</span><span class="folder-title">${escapeHtml(menu.title)}</span><span class="folder-count">${menu.items.length}</span><span class="folder-arrow" aria-hidden="true">›</span></button><div id="${id}" class="folder-body" hidden>${staySummary}${subfolders}</div></section>`;
}

function renderStaySummary(stay){
  const details=[stay.type,stay.area,stay.guests,stay.bedroom,stay.bed,stay.bathroom].filter(Boolean);
  const stayLink=stay.airbnbUrl?`<a class="folder-link" href="${escapeHtml(stay.airbnbUrl)}" target="_blank" rel="noopener noreferrer">Åbn Airbnb-opslaget ↗</a>`:'';
  const note=stay.note?`<p class="quality-note">${escapeHtml(stay.note)}</p>`:'';
  return `<article class="stay-summary"><strong>${escapeHtml(stay.name||'Bolig')}${stay.status?` · ${escapeHtml(stay.status)}`:''}</strong><p>${escapeHtml(details.join(' · '))}</p>${stayLink}${note}</article>`;
}

function renderSubfolder(item,menuIndex,itemIndex){
  const id=`submenu-${menuIndex}-${itemIndex}`;
  const externalLink=item.url?`<a class="folder-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.linkLabel||'Åbn officiel side ↗')}</a>`:'';
  const places=Array.isArray(item.places)&&item.places.length?`<div class="place-links"><strong>Steder hvor I kan prøve retten:</strong>${item.places.map(place=>`<a class="folder-link place-link" href="${escapeHtml(place.url)}" target="_blank" rel="noopener noreferrer">📍 ${escapeHtml(place.title)} ↗</a>`).join('')}</div>`:'';
  return `<article class="athen-subfolder"><button type="button" class="subfolder-toggle" aria-expanded="false" aria-controls="${id}"><span class="subfolder-icon" aria-hidden="true">${escapeHtml(item.icon||'ℹ️')}</span><span class="subfolder-title">${escapeHtml(item.title)}</span><span class="subfolder-arrow" aria-hidden="true">›</span></button><div id="${id}" class="subfolder-body" hidden><p>${escapeHtml(item.text||'')}</p>${externalLink}${places}</div></article>`;
}

function renderQualityFolder(note){
  return `<section class="athen-folder quality-folder"><button type="button" class="folder-toggle" aria-expanded="false" aria-controls="quality-panel"><span class="folder-icon" aria-hidden="true">✅</span><span class="folder-title">Kvalitetssikring</span><span class="folder-arrow" aria-hidden="true">›</span></button><div id="quality-panel" class="folder-body" hidden><p class="quality-note">${escapeHtml(note)}</p></div></section>`;
}

function bindAccordion(root){
  root.addEventListener('click',event=>{
    const toggle=event.target.closest('.folder-toggle,.subfolder-toggle');
    if(!toggle||!root.contains(toggle))return;
    const panel=document.getElementById(toggle.getAttribute('aria-controls'));
    if(!panel)return;
    const willOpen=toggle.getAttribute('aria-expanded')!=='true';
    toggle.setAttribute('aria-expanded',String(willOpen));
    panel.hidden=!willOpen;
  });
}

function runMenuQA(root,menuModel){
  const renderedMenus=[...root.querySelectorAll('.athen-folder[data-expected-count]')];
  const checks=[];
  menuModel.forEach((menu,index)=>{
    const folder=renderedMenus[index];
    const expected=menu.items.length;
    const actual=folder?folder.querySelectorAll(':scope > .folder-body > .athen-subfolder').length:0;
    checks.push({menu:menu.title,expected,actual,ok:expected===actual});
  });
  const allOk=checks.every(check=>check.ok)&&renderedMenus.length===menuModel.length;
  console.table(checks);
  if(allOk)console.info(`Athen menu-QA OK: ${menuModel.length} hovedmenuer, alle undermenuer renderet.`);
  else console.error('Athen menu-QA FEJL',checks);
}

function formatDate(value){
  return new Intl.DateTimeFormat('da-DK',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date(`${value}T12:00:00`));
}

function escapeHtml(value){
  return String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

loadAthenTrip();
