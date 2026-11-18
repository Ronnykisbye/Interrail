const CACHE='rejser-v1-20261118-6';
const CORE=[
  './','./index.html','./hub.css','./hub.js','./manifest.webmanifest','./data/trips.json',
  './antwerpen.html','./antwerpen-menu.css','./antwerpen-sub.css','./antwerpen-guide.js','./antwerpen-info.js','./antwerpen.css','./antwerpen.js','./data/antwerpen.json','./data/antwerpen-guide.json',
  './antwerpen-dage.html','./antwerpen-ruter.html','./antwerpen-hoteller.html','./antwerpen-jesteburg.html','./antwerpen-by.html','./antwerpen-kiel.html','./antwerpen-vejr.html','./antwerpen-praktisk.html',
  './interrail-istanbul.html','./interrail-istanbul.css','./interrail-istanbul.js','./data/interrail-istanbul.json',
  './ski-2027.html','./ski-2027-delt.html','./ski-2027.css','./ski-2027.js','./data/ski-2027.json',
  './kaunas.html','./kaunas-delt.html','./kaunas.css','./kaunas.js','./data/kaunas.json','./assets/kaunas-hero-2026.jpg','./assets/kaunas-billeder/20250506_215509.jpg','./assets/kaunas-billeder/20250508_112542.jpg','./assets/kaunas-billeder/20251215_163905.jpg','./assets/kaunas-billeder/20251215_164346.jpg','./assets/kaunas-billeder/20251215_204609.jpg','./assets/kaunas-billeder/20251215_211128.jpg','./assets/kaunas-billeder/20251215_211227.jpg','./assets/kaunas-billeder/20251216_191227.jpg','./assets/kaunas-billeder/20251219_194739.jpg','./assets/kaunas-billeder/WP_20170310_12_57_43_Pro.jpg','./assets/kaunas-billeder/WP_20170313_15_29_02_Pro.jpg','./kaunas-install.html','./kaunas-install.css','./kaunas-install.js','./kaunas.webmanifest','./assets/kaunas-icon.svg',
  './trip-install.css','./trip-install.js','./antwerpen-install.html','./antwerpen.webmanifest','./assets/antwerpen-icon.svg','./interrail-istanbul-install.html','./interrail-istanbul.webmanifest','./assets/interrail-istanbul-icon.svg','./ski-2027-install.html','./ski-2027.webmanifest','./assets/ski-2027-icon.svg',
  './data/athen-2026.json','./data/athen-food.json','./data/athen-stay.json','./data/athen-practical.json','./data/athen-tickets.json','./assets/athen-banner.svg',
  './interrail.html','./styles.css','./app.js','./install.js','./data/itinerary.json','./data/links.json','./data/hotels.json',
  './assets/rejser-icon.svg','./assets/favicon.svg','./assets/icon-192.jpg','./assets/icon-512.jpg','./assets/icon-maskable-512.jpg'
];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)));
  self.skipWaiting();
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.protocol!=='http:'&&url.protocol!=='https:')return;
  event.respondWith(fetch(event.request).then(response=>{
    if(response&&response.ok){
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(event.request,copy));
    }
    return response;
  }).catch(()=>caches.match(event.request).then(cached=>cached||caches.match('./index.html'))));
});