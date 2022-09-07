const cacheName = 'calculator_v1';
const resources = [
    'assets/fontawesome/css/fontawesome.css',
    'assets/fontawesome/css/regular.css',
    'assets/fontawesome/css/solid.css',
    'assets/fontawesome/webfonts/fa-regular-400.ttf',
    'assets/fontawesome/webfonts/fa-regular-400.woff2',
    'assets/fontawesome/webfonts/fa-solid-900.ttf',
    'assets/fontawesome/webfonts/fa-solid-900.woff2',
    'assets/fonts/Inter-Bold.ttf',
    'assets/fonts/Inter-Regular.ttf',
    'assets/icons/icon-180.png',
    'assets/icons/icon-192.png',
    'assets/icons/icon-512.png',
    'scripts/app.js',
    'scripts/theme-toggle.js',
    'scripts/toast.js',
    'style.css',
    'index.html'
];

const addResourcesToCache = async () => {
    const cache = await caches.open(cacheName);
    return cache.addAll(resources);
}

const fetchResourceFromCacheOrNetwork = async (request) => {
    const cache = await caches.open(cacheName);
    const cachedRespons = await caches.match(request);
    
    if (cachedRespons) {
        return cachedRespons;
    } else {
        const fetchedResponse = await fetch(request.url);
        // Add the network response to the cache for future use
        // Copy of the response is needed for saving in the cache
        // The original is used as response to the request
        cache.put(request, fetchedResponse.clone());

        return fetchedResponse;
    }
}

// Install event is fired after the service worker is registered. self is refered to the WorkerGlobalScope
self.addEventListener('install', event => {
    event.waitUntil(addResourcesToCache());
});

// Fetch event is fired when there is a request for resource
self.addEventListener('fetch', event => {
    event.respondWith(fetchResourceFromCacheOrNetwork(event.request));
});