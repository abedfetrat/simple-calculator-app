const assets = [
    '/',
    '/index.html',
    '/style.css',
    '/scripts/app.js',
    '/scripts/theme-toggle.js',
    '/scripts/toast.js',
    'images/icon.png',
    'images/icon.webp'
];

self.addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches.open('v1').then(cache => {
            cache.addAll(assets)
        })
    );
});

self.addEventListener('fetch', fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    );
});