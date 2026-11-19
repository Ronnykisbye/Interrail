let tripData=null,activeId='overblik',query='',showFavorites=false,searchAll=false;
const savedKey='kaunas-favorites-v1';
function getSaved(){try{return JSON.parse(localStorage.getItem(savedKey)||'[]')}catch{return []}}
function setSaved(v){try{localStorage.setItem(savedKey,JSON.stringify(v))}catch{}}
function esc(v){return String(v??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]))}
function safeUrl(v){try{const u=new URL(v,location.href);return ['https:','http:'].includes(u.protocol)?u.href:'#'}catch{return '#'}}
function cardImageHtml(c){
  if(!c.image)return '';
  const src=esc(safeUrl(c.image));
  const credit=c.imageCredit?'<a class="image-credit" href="'+esc(safeUrl(c.imageCreditUrl||c.image))+'" target="_blank" rel="noopener noreferrer">'+esc(c.imageCredit)+'</a>':'';
  return '<div class="card-media"><img src="'+src+'" alt="'+esc(c.imageAlt||c.title||'Billede')+'" loading="lazy" decoding="async">'+credit+'</div>';
}
function cardActionsHtml(c){
  if(c.go)return '<button class="action internal-action" data-go="'+esc(c.go)+'" type="button">Læs mere ↗</button>';
  let out='';
  if(c.url)out+='<a class="action" href="'+esc(safeUrl(c.url))+'" target="_blank" rel="noopener noreferrer">'+esc(c.urlLabel||(c.readUrl?'📍 Se på kort ↗':'Åbn på kort / hjemmeside ↗'))+'</a>';
  if(c.readUrl)out+='<a class="action history-read" href="'+esc(safeUrl(c.readUrl))+'" target="_blank" rel="noopener noreferrer">'+esc(c.readLabel||'📖 Læs historien ↗')+'</a>';
  if(Array.isArray(c.extraLinks))out+=c.extraLinks.map(x=>'<a class="action extra-action" href="'+esc(safeUrl(x.url))+'" target="_blank" rel="noopener noreferrer">'+esc(x.label||'Mere information ↗')+'</a>').join('');
  return out;
}
function cardId(tab,idx){return tab.id+':'+idx}
async function loadTrip(){
try{const r=await fetch('data/kaunas.json?v=20261119-4',{cache:'no-store'});if(!r.ok)throw Error('Data kunne ikke hentes');tripData=await r.json();renderTabs();selectTab(location.hash.slice(1)||'overblik',false)}
catch(e){console.error(e);document.getElementById('content').innerHTML='<article class="card wide"><h2>Guiden kunne ikke indlæses</h2><p>Prøv at genindlæse siden.</p></article>'}
}
function renderTabs(){const nav=document.getElementById('tabs');nav.innerHTML=tripData.tabs.map(t=>'<button type="button" class="tab" data-id="'+esc(t.id)+'" aria-pressed="false"><span class="tab-emoji" aria-hidden="true">'+esc(t.icon)+'</span><span class="tab-label">'+esc(t.label)+'</span><span class="tab-arrow" aria-hidden="true">↗</span></button>').join('');nav.addEventListener('click',e=>{const b=e.target.closest('button[data-id]');if(b)selectTab(b.dataset.id,true)})}
function selectTab(id,scroll){const t=tripData.tabs.find(x=>x.id===id)||tripData.tabs[0];activeId=t.id;query='';searchAll=false;showFavorites=false;document.getElementById('search').value='';document.getElementById('clearSearch').hidden=true;document.getElementById('favoritesButton').setAttribute('aria-pressed','false');document.querySelectorAll('.tab').forEach(b=>{const yes=b.dataset.id===t.id;b.classList.toggle('active',yes);b.setAttribute('aria-pressed',String(yes))});history.replaceState(null,'','#'+encodeURIComponent(t.id));renderContent();if(scroll)document.querySelector('.content-head').scrollIntoView({behavior:'smooth',block:'start'})}
function renderContent(){
const searchInput=document.getElementById('search');
const searchMode=Boolean(query)&&searchAll;
if(searchMode){renderGlobalSearch();return;}
const t=tripData.tabs.find(x=>x.id===activeId)||tripData.tabs[0];document.getElementById('sectionTitle').textContent=t.label;document.getElementById('sectionLabel').textContent='UDFORSK KAUNAS';
if(Array.isArray(t.gallery)&&t.gallery.length){
const galleryHtml='<div class="photo-gallery">'+t.gallery.map((name,i)=>'<a class="photo-item" href="assets/kaunas-billeder/'+encodeURIComponent(name)+'" target="_blank" rel="noopener noreferrer" aria-label="Åbn Kaunas-billede '+(i+1)+'"><img src="assets/kaunas-billeder/'+encodeURIComponent(name)+'" alt="Kaunas – eget rejsebillede '+(i+1)+'" loading="'+(i<2?'eager':'lazy')+'" decoding="async"></a>').join('')+'</div>';
document.getElementById('content').innerHTML='<p class="intro">'+esc(t.intro||'')+'</p>'+galleryHtml;
return;
}
const saved=getSaved();let cards=(t.cards||[]).map((c,i)=>({...c,key:cardId(t,i)})).filter(c=>(!showFavorites||saved.includes(c.key))&&(!query||(c.title+' '+(c.text||'')).toLocaleLowerCase('da').includes(query)));
const cardsHtml=cards.map(c=>'<article class="card '+(c.wide?'wide ':'')+(c.featured?'featured-card':'')+'">'+(c.badge?'<span class="featured-badge">'+esc(c.badge)+'</span>':'')+cardImageHtml(c)+'<button class="save '+(saved.includes(c.key)?'saved':'')+'" type="button" data-save="'+esc(c.key)+'" aria-label="'+(saved.includes(c.key)?'Fjern fra gemte':'Gem som favorit')+'" aria-pressed="'+saved.includes(c.key)+'">'+(saved.includes(c.key)?'♥':'♡')+'</button><div class="icon">'+esc(c.icon||'✦')+'</div><h2>'+esc(c.title)+'</h2><p>'+esc(c.text||'')+'</p>'+cardActionsHtml(c)+'</article>').join('');
const facts=(!query&&!showFavorites&&t.facts)?'<article class="card wide">'+t.facts.map(f=>'<div class="fact"><strong>'+esc(f.label)+'</strong><span>'+esc(f.value)+'</span></div>').join('')+'</article>':'';
const links=(!query&&!showFavorites&&t.links)?'<article class="card wide"><h2>Nyttige links</h2><div class="links">'+t.links.map(l=>'<a href="'+esc(safeUrl(l.url))+'" target="_blank" rel="noopener noreferrer">'+esc(l.title)+'<small>'+esc(l.text||'')+'</small></a>').join('')+'</div></article>':'';
document.getElementById('content').innerHTML=(!query&&!showFavorites?'<p class="intro">'+esc(t.intro||'')+'</p>':'')+(cardsHtml||(!facts&&!links?'<div class="empty">Ingen resultater her. Prøv en anden mappe eller søgning.</div>':''))+facts+links;
}
document.getElementById('content').addEventListener('click',e=>{const b=e.target.closest('[data-save]');if(!b)return;let saved=getSaved();saved=saved.includes(b.dataset.save)?saved.filter(x=>x!==b.dataset.save):[...saved,b.dataset.save];setSaved(saved);renderContent()});
document.getElementById('search').addEventListener('input',e=>{query=e.target.value.trim().toLocaleLowerCase('da');searchAll=Boolean(query);document.getElementById('clearSearch').hidden=!query;renderContent()});
document.getElementById('clearSearch').addEventListener('click',()=>{document.getElementById('search').value='';query='';searchAll=false;document.getElementById('clearSearch').hidden=true;renderContent();document.getElementById('search').focus()});
document.getElementById('favoritesButton').addEventListener('click',e=>{showFavorites=!showFavorites;query='';searchAll=false;document.getElementById('search').value='';document.getElementById('clearSearch').hidden=true;e.currentTarget.setAttribute('aria-pressed',String(showFavorites));renderContent()});
document.getElementById('flightButton').addEventListener('click',()=>selectTab('fly',true));
window.addEventListener('hashchange',()=>{if(tripData&&location.hash.slice(1)!==activeId)selectTab(decodeURIComponent(location.hash.slice(1)),false)});

function renderGlobalSearch(){
document.getElementById('sectionTitle').textContent='Søgeresultater';
document.getElementById('sectionLabel').textContent='PÅ TVÆRS AF ALLE MAPPER';
const results=tripData.tabs.flatMap(t=>(t.cards||[]).map((c,i)=>({t,c,i}))).filter(x=>(x.c.title+' '+(x.c.text||'')+' '+x.t.label).toLocaleLowerCase('da').includes(query)).slice(0,45);
document.getElementById('content').innerHTML=results.length?results.map(({t,c,i})=>'<article class="card"><span class="result-tag">'+esc(t.icon)+' '+esc(t.label)+'</span><div class="icon">'+esc(c.icon||'✦')+'</div><h2>'+esc(c.title)+'</h2><p>'+esc(c.text||'')+'</p>'+cardActionsHtml(c)+'<button class="result-open" data-go="'+esc(t.id)+'" type="button">Se hele mappen ↗</button></article>').join(''):'<div class="empty">Ingen resultater. Prøv fx “julemarked”, “kartoffel” eller “bus”.</div>';
}
document.getElementById('content').addEventListener('click',e=>{const b=e.target.closest('[data-go]');if(b)selectTab(b.dataset.go,true)});
document.getElementById('shareButton').addEventListener('click',async()=>{const info={title:'Kaunas – Efterår 2026',text:'Pigernes rejseguide til Kaunas',url:location.href};if(navigator.share){try{await navigator.share(info)}catch(e){if(e.name!=='AbortError')console.warn(e)}}else{try{await navigator.clipboard.writeText(info.url);const b=document.getElementById('shareButton');b.textContent='✓ Link kopieret';setTimeout(()=>b.textContent='↗ Del guiden',2200)}catch{prompt('Kopiér linket',info.url)}}});

loadTrip();
