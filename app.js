const state={data:null,links:[],map:null};
const routeStops=[
  {name:'Snekkersten',lat:56.0095,lng:12.5822,type:'day'},
  {name:'København Syd',lat:55.6380,lng:12.5360,type:'night'},
  {name:'Berlin Hbf',lat:52.5251,lng:13.3694,type:'day'},
  {name:'Kraków Główny',lat:50.0674,lng:19.9472,type:'night'},
  {name:'Wien Hbf',lat:48.1852,lng:16.3768,type:'day'},
  {name:'Innsbruck Hbf',lat:47.2639,lng:11.4010,type:'day'},
  {name:'Chur',lat:46.8530,lng:9.5308,type:'panorama'},
  {name:'St. Moritz',lat:46.4970,lng:9.8380,type:'panorama'},
  {name:'Tirano',lat:46.2165,lng:10.1690,type:'day'},
  {name:'Milano Centrale',lat:45.4856,lng:9.2042,type:'day'},
  {name:'Montreux',lat:46.4358,lng:6.9107,type:'panorama'},
  {name:'Interlaken Ost',lat:46.6900,lng:7.8690,type:'day'},
  {name:'Antwerpen-Centraal',lat:51.2172,lng:4.4211,type:'day'},
  {name:'Bruxelles-Midi',lat:50.8357,lng:4.3365,type:'night'},
  {name:'Hamburg-Harburg',lat:53.4568,lng:9.9917,type:'day'},
  {name:'København H',lat:55.6727,lng:12.5649,type:'day'},
  {name:'Snekkersten',lat:56.0095,lng:12.5822,type:'day'}
];
const colors={day:'#25835b',night:'#173a7a',panorama:'#ef8d22'};

async function loadData(){
  try{
    const [tripRes,linksRes]=await Promise.all([fetch('data/itinerary.json'),fetch('data/links.json')]);
    if(!tripRes.ok||!linksRes.ok)throw new Error('Data kunne ikke hentes');
    state.data=await tripRes.json();state.links=await linksRes.json();
    initApp();
  }catch(error){
    console.error(error);
    document.querySelector('main').innerHTML='<article class="about-card"><h2>Appdata kunne ikke indlæses</h2><p>Genindlæs siden. Første åbning kræver internet, hvorefter appen kan bruges offline.</p></article>';
  }
}

function initApp(){
  bindNavigation();bindTheme();renderOverview();renderToday();renderLinks();registerServiceWorker();
}

function bindNavigation(){
  document.querySelectorAll('[data-nav]').forEach(btn=>btn.addEventListener('click',()=>showView(btn.dataset.nav)));
}
function showView(id){
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===id));
  document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.toggle('active',b.dataset.nav===id));
  window.scrollTo({top:0,behavior:'smooth'});
  if(id==='route')setTimeout(renderMap,80);
}
function bindTheme(){
  const saved=localStorage.getItem('interrail-theme');
  if(saved==='dark')document.body.classList.add('dark');
  updateThemeIcon();
  document.getElementById('themeToggle').addEventListener('click',()=>{
    document.body.classList.toggle('dark');
    localStorage.setItem('interrail-theme',document.body.classList.contains('dark')?'dark':'light');
    updateThemeIcon();
  });
}
function updateThemeIcon(){document.getElementById('themeToggle').textContent=document.body.classList.contains('dark')?'☀':'☾'}

function localDate(value){return new Date(`${value}T12:00:00`)}
function formatDate(value){return new Intl.DateTimeFormat('da-DK',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(localDate(value))}
function getCurrentDay(){
  const now=new Date();
  const days=state.data.days;
  const exact=days.find(d=>d.date===now.toISOString().slice(0,10));
  if(exact)return exact;
  if(now<localDate(days[0].date))return days[0];
  return [...days].reverse().find(d=>now>=localDate(d.date))||days[0];
}
function getProgress(){
  const start=localDate(state.data.trip.start),end=localDate(state.data.trip.end),now=new Date();
  if(now<=start)return 0;if(now>=end)return 100;
  return Math.round(((now-start)/(end-start))*100);
}
function renderOverview(){
  const day=getCurrentDay();
  document.getElementById('nextTitle').textContent=day.title;
  document.getElementById('nextDate').textContent=formatDate(day.date);
  const diff=localDate(state.data.trip.start)-new Date();
  const count=document.getElementById('countdown');
  if(diff>0){const n=Math.ceil(diff/86400000);count.textContent=`${n} ${n===1?'dag':'dage'} til afrejse`;}
  else if(new Date()<=localDate(state.data.trip.end)){count.textContent='Rejsen er i gang';}
  else count.textContent='Rejsen er afsluttet';
  const p=getProgress();document.getElementById('progressText').textContent=`${p} %`;document.getElementById('progressBar').style.width=`${p}%`;
}
function renderToday(){
  const day=getCurrentDay();
  document.getElementById('todayDate').textContent=formatDate(day.date);
  document.getElementById('todayCard').innerHTML=`<article class="trip-card"><span class="badge">${escapeHtml(day.status)}</span><div class="route">${escapeHtml(day.title)}</div><p>${escapeHtml(day.summary)}</p><small><strong>Overnatning:</strong> ${escapeHtml(day.overnight)}</small></article>`;
  document.getElementById('timeline').innerHTML=day.events.map(event=>`<div class="timeline-item"><div class="timeline-time">${escapeHtml(event.time)}</div><div class="timeline-dot"></div><div class="timeline-body"><strong>${escapeHtml(event.title)}</strong><p>${escapeHtml(event.detail)}</p></div></div>`).join('');
}
function renderLinks(){
  document.getElementById('linkList').innerHTML=state.links.map(link=>`<a class="link-card" href="${link.url}" target="_blank" rel="noopener noreferrer"><div><strong>${escapeHtml(link.title)}</strong><small>${escapeHtml(link.subtitle)}</small></div><b>${link.icon}</b></a>`).join('');
}
function renderMap(){
  if(state.map){state.map.invalidateSize();return;}
  state.map=L.map('map',{zoomControl:true}).setView([49,10],5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap-bidragsydere'}).addTo(state.map);
  routeStops.forEach((stop,index)=>{
    L.circleMarker([stop.lat,stop.lng],{radius:7,color:'#fff',weight:2,fillColor:colors[stop.type],fillOpacity:1}).addTo(state.map).bindPopup(`<strong>${index+1}. ${stop.name}</strong>`);
    if(index<routeStops.length-1){const next=routeStops[index+1];L.polyline([[stop.lat,stop.lng],[next.lat,next.lng]],{color:colors[stop.type],weight:5,opacity:.85}).addTo(state.map);}
  });
  state.map.fitBounds(routeStops.map(s=>[s.lat,s.lng]),{padding:[24,24]});
}
function escapeHtml(value){return String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]))}
function registerServiceWorker(){if('serviceWorker'in navigator)navigator.serviceWorker.register('service-worker.js').catch(console.error)}
loadData();