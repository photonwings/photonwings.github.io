const staticCacheName = "static-v1.0.0";
const dynamicCacheName = "dynamic-v1.0.0";
const assets = [
  "/",
  "/index.html",
  "/about.html",
  "/contact.html",
  "/education.html",
  "/manifest.json",
  "/project.html",
  "/skills.html",
  "/sw.js",
  "js/app.js",
  "/assets/dsa.jpg",
  "/assets/ethereum.jpg",
  "/assets/expressino.jpg",
  "/assets/frontend.jpg",
  "/assets/portfolio.jpg",
  "/assets/resume.pdf",
  "/assets/wings.jpg",
  "/js/app.js",
];

self.addEventListener("install", (evt) => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(e.request);
      const cache = await caches.open(staticCacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});
