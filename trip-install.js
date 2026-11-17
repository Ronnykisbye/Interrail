let deferredPrompt=null;
const body=document.body;
const appName=body.dataset.appName||'Rejsen';
const button=document.getElementById('installButton');
const status=document.getElementById('status');
const steps=document.getElementById('steps');
const badge=document.getElementById('badge');
const title=document.getElementById('deviceTitle');
const text=document.getElementById('deviceText');
const ua=navigator.userAgent.toLowerCase();
const isIOS=/iphone|ipad|ipod/.test(ua);
const isAndroid=/android/.test(ua);
const standalone=()=>window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;

if('serviceWorker' in navigator){navigator.serviceWorker.register('service-worker.js?v=20261117-16',{updateViaCache:'none'}).catch(()=>{});}

function ios(){
  badge.textContent='iPhone / iPad';
  title.textContent='Installer '+appName+' på hjemmeskærmen';
  text.textContent='Apple kræver, at du bruger Del-menuen.';
  button.querySelector('strong').textContent='Vis iPhone-vejledning';
  button.querySelector('span').textContent='Del → Føj til hjemmeskærm';
}
function android(){
  badge.textContent='Android';
  title.textContent='Installer '+appName+' som app';
  text.textContent='Når browseren er klar, åbner knappen installationsdialogen.';
  button.querySelector('strong').textContent='Installer '+appName;
  button.querySelector('span').textContent='Få et ikon på hjemmeskærmen';
}
function desktop(){
  badge.textContent='Computer';
  title.textContent='Installer '+appName+' som webapp';
  text.textContent='Chrome og Edge kan normalt installere siden som en selvstændig app.';
}
function iosSteps(){
  steps.hidden=false;
  steps.innerHTML='<ol><li>Åbn siden i <strong>Safari</strong>.</li><li>Tryk på <strong>Del</strong>.</li><li>Vælg <strong>Føj til hjemmeskærm</strong>.</li><li>Kontrollér navnet og tryk <strong>Tilføj</strong>.</li></ol>';
  status.textContent='Derefter ligger '+appName+' som et ikon på hjemmeskærmen.';
}
function fallback(){
  steps.hidden=false;
  steps.innerHTML='<ol><li>Åbn browsermenuen <strong>⋮</strong>.</li><li>Vælg <strong>Installer app</strong> eller <strong>Føj til startskærm</strong>.</li><li>Bekræft installationen.</li></ol>';
  status.textContent='Hvis installationsdialogen ikke vises automatisk, brug trinene ovenfor.';
}
if(standalone()){
  badge.textContent='Installeret';title.textContent=appName+' er allerede installeret';text.textContent='Du kan åbne rejsen direkte fra hjemmeskærmen.';
  button.disabled=true;button.classList.add('installed');button.querySelector('strong').textContent='Allerede installeret';button.querySelector('span').textContent='Alt er klar';
}else if(isIOS)ios();else if(isAndroid)android();else desktop();
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;if(!isIOS){status.textContent='Installationen er klar.';button.querySelector('strong').textContent='Installer '+appName+' nu';}});
button.addEventListener('click',async()=>{if(standalone())return;if(isIOS){iosSteps();return;}if(deferredPrompt){deferredPrompt.prompt();const c=await deferredPrompt.userChoice;deferredPrompt=null;status.textContent=c.outcome==='accepted'?'Installationen er startet.':'Installationen blev ikke gennemført.';return;}fallback();});
window.addEventListener('appinstalled',()=>{status.textContent=appName+' er nu installeret.';button.disabled=true;button.classList.add('installed');button.querySelector('strong').textContent='Installeret';button.querySelector('span').textContent='Du finder ikonet på hjemmeskærmen';});