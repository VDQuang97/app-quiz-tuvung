const CACHE_NAME = "jlpt-app-auto";

// cache file cơ bản
const urlsToCache = [
  "./",
  "./index.html"
];

// ===== INSTALL =====
self.addEventListener("install", event => {
  self.skipWaiting(); // 🔥 luôn update ngay

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ===== ACTIVATE =====
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim(); // 🔥 dùng version mới ngay
});

// ===== FETCH =====
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request) // 🔥 luôn lấy bản mới từ server
      .catch(() => caches.match(event.request)) // offline fallback
  );
});