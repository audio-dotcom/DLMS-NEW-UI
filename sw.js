// Service worker DLMS - cache-first untuk file statis, supaya app bisa dibuka offline.
// Ganti angka VERSI setiap kali index.html/ikon diubah, supaya Chrome tidak memakai cache lama.
const VERSI = 'dlms-v5';
const FILES = [
  './', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './icon-maskable-512.png',
  './apple-touch-icon.png', './favicon.png', './logo-wordmark.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSI).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSI).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return;
  // halaman: coba jaringan dulu (biar update cepat), cadangan cache
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(r => { const c = r.clone(); caches.open(VERSI).then(ch => ch.put('./index.html', c)); return r; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(r => {
      const c = r.clone(); caches.open(VERSI).then(ch => ch.put(req, c)); return r;
    }))
  );
});
