const CACHE='rejser-v1-20260814-3';
const CORE=[
  './','./index.html','./hub.css','./hub.js','./manifest.webmanifest','./data/trips.json',
  './antwerpen.html','./antwerpen.css','./antwerpen.js','./data/antwerpen.json',
  './interrail-istanbul.html','./interrail-istanbul.css','./interrail-istanbul.js','./data/interrail-istanbul.json',
  './interrail.html','./styles.css','./app.js','./install.js','./data/itinerary.json','./data/links.json','./data/hotels.json',
  './assets/favicon.svg','./assets/icon-192.jpg','./assets/icon-512.jpg','./assets/icon-maskable-512.jpg',
  './downloads/Interrail_2026_Hotelliste.xlsx','./downloads/Interrail_2026_Togliste_korrigeret_med_rejsetid.xlsx'
];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))));self.clients.claim();});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(fetch(event.request).then(response=>{
    const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;
  }).catch(()=>caches.match(event.request).then(cached=>cached||caches.match('./index.html'))));
});