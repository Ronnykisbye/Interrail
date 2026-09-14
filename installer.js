let deferredPrompt=null;
const button=document.getElementById('installButton');
const status=document.getElementById('installStatus');
const steps=document.getElementById('steps');
const badge=document.getElementById('deviceBadge');
const title=document.getElementById('deviceTitle');
const text=document.getElementById('deviceText');

const ua=navigator.userAgent.toLowerCase();
const isIOS=/iphone|ipad|ipod/.test(ua);
const isAndroid=/android/.test(ua);
const isSamsung=/samsungbrowser/.test(ua)||/sm-[a-z0-9]+/.test(ua);
const isStandalone=()=>window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;

function showIOS(){
  badge.textContent='iPhone / iPad';
  title.textContent='Installer på iPhone';
  text.textContent='iPhone kræver Apples egen “Føj til hjemmeskærm”-funktion i Safari.';
  button.querySelector('strong').textContent='Vis iPhone-vejledning';
  button.querySelector('span').textContent='Safari → Del → Føj til hjemmeskærm';
}
function showAndroid(){
  badge.textContent=isSamsung?'Samsung / Android':'Android';
  title.textContent='Installer på Android';
  text.textContent='Når browseren tillader det, åbner knappen installationsdialogen direkte.';
  button.querySelector('strong').textContent='Installer Rejser';
  button.querySelector('span').textContent='Installer appen på hjemmeskærmen';
}
function showDesktop(){
  badge.textContent='Computer';
  title.textContent='Installer Rejser som app';
  text.textContent='Chrome og Edge kan installere Rejser som en selvstændig app.';
}
function showIOSSteps(){
  steps.hidden=false;
  steps.innerHTML='<ol><li>Åbn denne side i <strong>Safari</strong>.</li><li>Tryk på <strong>Del</strong>-ikonet.</li><li>Vælg <strong>Føj til hjemmeskærm</strong>.</li><li>Tryk <strong>Tilføj</strong>.</li></ol>';
  status.textContent='Det er den korteste installation, Apple tillader på iPhone.';
}
function showAndroidSteps(){
  steps.hidden=false;
  steps.innerHTML='<ol><li>Åbn browsermenuen ⋮.</li><li>Vælg <strong>Installer app</strong> eller <strong>Føj til startskærm</strong>.</li><li>Bekræft installationen.</li></ol>';
  status.textContent='Hvis installationsdialogen ikke vises automatisk, brug disse trin.';
}

if(isStandalone()){
  badge.textContent='Installeret';
  title.textContent='Rejser er allerede installeret';
  text.textContent='Du kan åbne appen direkte fra din hjemmeskærm.';
  button.disabled=true;
  button.classList.add('installed');
  button.querySelector('strong').textContent='Appen er installeret';
  button.querySelector('span').textContent='Alt er klar';
}else if(isIOS)showIOS();
else if(isAndroid)showAndroid();
else showDesktop();

window.addEventListener('beforeinstallprompt',event=>{
  event.preventDefault();
  deferredPrompt=event;
  if(!isIOS){
    status.textContent='Installationen er klar.';
    button.querySelector('strong').textContent='Installer Rejser nu';
  }
});

button.addEventListener('click',async()=>{
  if(isStandalone())return;
  if(isIOS){showIOSSteps();return;}
  if(deferredPrompt){
    deferredPrompt.prompt();
    const choice=await deferredPrompt.userChoice;
    deferredPrompt=null;
    status.textContent=choice.outcome==='accepted'?'Installationen er startet.':'Installationen blev ikke gennemført.';
    return;
  }
  showAndroidSteps();
});

window.addEventListener('appinstalled',()=>{
  status.textContent='Rejser er nu installeret.';
  button.disabled=true;
  button.classList.add('installed');
  button.querySelector('strong').textContent='Appen er installeret';
  button.querySelector('span').textContent='Du finder den på hjemmeskærmen';
});