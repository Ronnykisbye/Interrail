async function loadSkiTrip(){
  const root=document.getElementById('skiContent');
  try{
    const response=await fetch('data/ski-2027.json?v=20260827-2',{cache:'no-store'});
    if(!response.ok)throw new Error('Skiferiedata kunne ikke hentes');
    const data=await response.json();
    document.getElementById('skiTitle').textContent=data.trip.title;
    document.getElementById('skiSubtitle').textContent=data.trip.subtitle;
    document.getElementById('skiStatus').textContent=data.trip.status;
    document.getElementById('skiCandidate').textContent=data.trip.candidate;

    const planning=Array.isArray(data.planning)?data.planning:[];
    const links=Array.isArray(data.links)?data.links:[];

    const cards=planning.map(item=>{
      const title=item.url
        ? `<h2><a class="ski-title-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)} ↗</a></h2>`
        : `<h2>${escapeHtml(item.title)}</h2>`;
      return `<article class="ski-card"><div class="ski-icon" aria-hidden="true">${escapeHtml(item.icon)}</div>${title}<p>${escapeHtml(item.text)}</p></article>`;
    }).join('');

    const linkCard=links.length
      ? `<article class="ski-card ski-links-card"><div class="ski-icon" aria-hidden="true">🔗</div><h2>Nyttige links</h2><div class="ski-links">${links.map(link=>`<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.title)} ↗</a>`).join('')}</div></article>`
      : '';

    root.innerHTML=cards+linkCard;
  }catch(error){
    console.error(error);
    root.innerHTML='<article class="ski-card"><h2>Data kunne ikke indlæses</h2><p>Genindlæs siden og prøv igen.</p></article>';
  }
}

function escapeHtml(value){
  return String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

loadSkiTrip();
