const CACHE='rejser-v1-20260915-3';
const CORE=[
  './','./index.html','./hub.css','./hub.js','./manifest.webmanifest','./data/trips.json',
  './antwerpen.html','./antwerpen.css','./antwerpen.js','./data/antwerpen.json',
  './interrail-istanbul.html','./interrail-istanbul.css','./interrail-istanbul.js','./data/interrail-istanbul.json',
  './ski-2027.html','./ski-2027-delt.html','./ski-2027.css','./ski-2027.js','./data/ski-2027.json',
  './athen-2026.html','./athen-2026.css','./athen-2026.js','./data/athen-2026.json','./data/athen-food.json','./data/athen-stay.json','./data/athen-practical.json','./assets/athen-banner.svg',
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