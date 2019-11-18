/**
 * @file service-worker.js with workbox api
 * @desc [example](https://workbox-samples.glitch.me/examples/workbox-sw/)
 * @author ibyli(15186743693@163.com)
 */

/* globals workbox */
workbox.core.setCacheNameDetails({
    prefix: 'lavas-cache',
    suffix: 'v1',
    precache: 'install-time',
    runtime: 'run-time',
    googleAnalytics: 'ga'
});
// workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

self.addEventListener('message', event => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});

/**
 * example runningCache with api
 */
workbox.routing.registerRoute(
    /^https:\/\/open\.furuzix\.top\/api\/web\/.+/,
    workbox.strategies.networkFirst()
);

/**
 * example runningCache with resources from CDN
 * including maxAge, maxEntries
 * cacheableResponse is important for CDN
 */
workbox.routing.registerRoute(
    /^https:\/\/ito\.oss-cn-beijing\.aliyuncs\.com\/web-design-competition\/\D+/i,
    workbox.strategies.cacheFirst({
        cacheName: 'lavas-cache-images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 100,
                maxAgeSeconds: 7 * 24 * 60 * 60
            }),
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            })
        ]
    })
);
