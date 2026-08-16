// نسخة "إلغاء" — وظيفتها الوحيدة إنها تمسح أي Service Worker وأي كاش قديم
// اتسجل من محاولات سابقة، وترجع الصفحة موقع عادي 100%.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((clients) => {
        clients.forEach((client) => client.navigate(client.url));
      })
  );
});
