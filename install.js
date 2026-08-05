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

updateInstallButton();
