const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    './index.html',
    './style.css',
    './manifest.json',
    './light-blue.jpg',
    './light-gold.jpg',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png'
];

// Install event - Cache resources
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing service worker...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching all resources');
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch event - Serve from cache, fallback to network if not cached
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return the cached file if found, or fetch from the network
            if (response) {
                console.log(`[Service Worker] Serving from cache: ${event.request.url}`);
                return response;
            }
            console.log(`[Service Worker] Fetching from network: ${event.request.url}`);
            return fetch(event.request).catch(() => {
                // Fallback behavior if fetch fails (e.g., user is offline)
                if (event.request.destination === 'document') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});

// Activate event - Cleanup old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating service worker...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log(`[Service Worker] Deleting old cache: ${cache}`);
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

