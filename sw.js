// CargoNavi — Service Worker v9
const CACHE_NAME = 'cargonavi-v9'; // v9 — glyphs fix, Overpass timeout fix, profile fallback fix

// Files to pre-cache on install
// NOTE: Do NOT include './' — GitHub Pages has no index.html and would return 404
const PRECACHE_URLS = [
    './navigation_v4.html',
    './icon-192.png',
    './icon-512-final.png',
    './manifest.json',
    './FRANKY.png',
    './mtb_topdown.png',
    './racingbike_topdown.png',
    './delorean_topdown.png'
];

// Install: pre-cache essential files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(PRECACHE_URLS).catch(err => {
                console.log('Precache failed:', err);
            });
        })
    );
    self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            )
        )
    );
    event.waitUntil(clients.claim());
});

// Fetch: network-first, fallback to cache
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip API calls (routing, geocoding, POIs) — always network
    const url = new URL(event.request.url);
    if (url.hostname.includes('brouter.de') ||
        url.hostname.includes('routing.openstreetmap.de') ||
        url.hostname.includes('nominatim.openstreetmap.org') ||
        url.hostname.includes('overpass-api.de') ||
        url.hostname.includes('overpass.kumi.systems') ||
        url.hostname.includes('maps.mail.ru') ||
        url.hostname.includes('tile.openstreetmap.org') ||
        url.hostname.includes('server.arcgisonline.com') ||
        url.hostname.includes('services.arcgisonline.com')) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Cache successful responses
                if (response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            })
            .catch(() => {
                // Offline fallback: try cache, then serve navigation page
                return caches.match(event.request).then(cached => {
                    if (cached) return cached;
                    // If anything fails, serve the main app page
                    return caches.match('./navigation_v4.html');
                });
            })
    );
});
