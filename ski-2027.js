async function loadSkiTrip(){
  const root=document.getElementById('skiContent');
  try{
    const response=await fetch('data/ski-2027.json?v=20260914-1',{cache:'no-store'});
    if(!response.ok)throw new Error('Skiferiedata kunne ikke hentes');
    const data=await response.json();

    document.getElementById('skiTitle').textContent=data.trip.title;
    document.getElementById('skiSubtitle').textContent=data.trip.subtitle;
    document.getElementById('skiStatus').textContent=data.trip.status;
    document.getElementById('skiCandidate').textContent=data.trip.candidate;

    const highlights=Array.isArray(data.highlights)?data.highlights:[];
    const sections=Array.isArray(data.sections)?data.sections:[];
    const information=Array.isArray(data.information)?data.information:[];

    const highlightCards=highlights.map(item=>`
      <article class="ski-card ski-highlight">
        <div class="ski-icon" aria-hidden="true">${escapeHtml(item.icon)}</div>
        <h2>${escapeHtml(item.title)}</h2>
        <p>${escapeHtml(item.text)}</p>
      </article>`).join('');

    const sectionCards=sections.map(section=>`
      <article class="ski-card ski-section">
        <div class="ski-icon" aria-hidden="true">${escapeHtml(section.icon||'ℹ️')}</div>
        <h2>${escapeHtml(section.title)}</h2>
        <dl class="ski-facts">
          ${(section.items||[]).map(item=>`
            <div class="ski-fact">
              <dt>${escapeHtml(item.label)}</dt>
              <dd>${escapeHtml(item.value)}</dd>
            </div>`).join('')}
        </dl>
      </article>`).join('');

    const informationCard=information.length
      ? `<article class="ski-card ski-section ski-links-card">
          <div class="ski-icon" aria-hidden="true">🔗</div>
          <h2>Nyttige links</h2>
          <div class="ski-links">
            ${information.map(item=>`
              <a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">
                <strong>${escapeHtml(item.title)}</strong>
                <span>${escapeHtml(item.text||'')}</span>
                <b aria-hidden="true">↗</b>
              </a>`).join('')}
          </div>
        </article>`
      : '';

    const note=data.trip.sourceNote
      ? `<article class="ski-card ski-note"><div class="ski-icon" aria-hidden="true">🔒</div><h2>Privatliv</h2><p>${escapeHtml(data.trip.sourceNote)}</p></article>`
      : '';

    root.innerHTML=highlightCards+sectionCards+informationCard+note;
  }catch(error){
    console.error(error);
    root.innerHTML='<article class="ski-card"><h2>Data kunne ikke indlæses</h2><p>Genindlæs siden og prøv igen.</p></article>';
  }
}

function escapeHtml(value){
  return String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

async function registerServiceWorker(){
  if(!('serviceWorker' in navigator))return;
  try{
    const registration=await navigator.serviceWorker.register('service-worker.js?v=20260914-1',{updateViaCache:'none'});
    await registration.update();
  }catch(error){
    console.error('Service worker kunne ikke opdateres',error);
  }
}

loadSkiTrip();
registerServiceWorker();
