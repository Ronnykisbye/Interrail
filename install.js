let deferredInstallPrompt=null;

const installButton=document.getElementById('installAppButton');
const installStatus=document.getElementById('installStatus');

function isStandalone(){
  return window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
}

function showInstallHelp(){
  const ua=navigator.userAgent.toLowerCase();
  let text='Åbn browserens menu og vælg Installer app eller Føj til startskærm.';
  if(/iphone|ipad|ipod/.test(ua))text='På iPhone/iPad: Åbn siden i Safari, tryk Del og vælg Føj til hjemmeskærm.';
  else if(/android/.test(ua))text='På Android: Tryk på browsermenuen og vælg Installer app eller Føj til startskærm.';
  else text='På PC: Brug installationsikonet i højre side af adresselinjen, eller browsermenuen → Installer Interrail 2026.';
  if(installStatus)installStatus.textContent=text;
}

function updateInstallButton(){
  if(!installButton)return;
  if(isStandalone()){
    installButton.querySelector('strong').textContent='Appen er installeret';
    installButton.querySelector('small').textContent='Interrail 2026 kører som app';
    installButton.disabled=true;
    installButton.classList.add('installed');
  }else if(deferredInstallPrompt){
    installButton.querySelector('strong').textContent='Installer app';
    installButton.querySelector('small').textContent='Installer på denne PC eller mobil';
    installButton.disabled=false;
  }else{
    installButton.querySelector('strong').textContent='Installer app';
    installButton.querySelector('small').textContent='Vis installation eller vejledning';
    installButton.disabled=false;
  }
}

function addNeonVoyagesButton(){
  if(document.getElementById('neonVoyagesButton'))return;
  const actions=document.querySelector('.home-actions');
  if(!actions)return;
  const link=document.createElement('a');
  link.id='neonVoyagesButton';
  link.className='home-action';
  link.href='https://ronnykisbye.github.io/neon-voyages/';
  link.target='_blank';
  link.rel='noopener noreferrer';
  link.setAttribute('aria-label','Åbn Neon Voyages i en ny fane');
  link.style.textDecoration='none';
  link.style.background='linear-gradient(135deg,#31155f,#6d28d9)';
  link.style.color='#fff';
  link.innerHTML='<span class="home-action-icon">🌌</span><span><strong>Åbn Neon Voyages</strong><small style="color:rgba(255,255,255,.84)">Åbn den alternative rejseapp</small></span><b aria-hidden="true">↗</b>';
  actions.appendChild(link);
}

window.addEventListener('beforeinstallprompt',event=>{
  event.preventDefault();
  deferredInstallPrompt=event;
  updateInstallButton();
});

window.addEventListener('appinstalled',()=>{
  deferredInstallPrompt=null;
  if(installStatus)installStatus.textContent='Appen er nu installeret.';
  updateInstallButton();
});

if(installButton){
  installButton.addEventListener('click',async()=>{
    if(isStandalone())return;
    if(deferredInstallPrompt){
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt=null;
      updateInstallButton();
    }else showInstallHelp();
  });
}

addNeonVoyagesButton();
updateInstallButton();
