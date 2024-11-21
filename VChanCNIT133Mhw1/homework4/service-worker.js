const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    './index.html',
    './style.css',
    './light-blue.jpg',
    './light-gold.jpg',
    './manifest.json',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png'
];

// Install service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch resources
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Activate service worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
button.addEventListener('click', () => {
    const selected = select.value;
    document.body.style.backgroundImage = selected === 'light-blue' 
        ? 'url("light-blue.jpg")' 
        : selected === 'light-gold' 
            ? 'url("light-gold.jpg")' 
            : 'none';
    document.body.style.backgroundColor = selected === 'white' ? 'white' : 'transparent';

    document.body.style.backgroundRepeat = 'no-repeat'; 
    document.body.style.backgroundSize = 'cover'; 
    document.body.style.backgroundPosition = 'center'; 
});

