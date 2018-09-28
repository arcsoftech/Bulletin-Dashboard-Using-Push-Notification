/*
Give the service worker access to Firebase Messaging.
Note that you can only use Firebase Messaging here, other Firebase libraries are not available in the service worker.
*/


var cacheName = 'pwa-commits-v3';
var filesToCache = [
    './',
    './css/style.css',
    './css/viewer.css',
	'./images/push-off.png',
	'./js/notification.js',
	'./sw.js',
    'index.html',
    'latest.html'
];

// Install Service Worker
self.addEventListener('install', function(event) {
    console.log('Service Worker: Installing....');

    event.waitUntil(

        // Open the Cache
        caches.open(cacheName).then(function(cache) {
            console.log('Service Worker: Caching App Shell at the moment......');

            // Add Files to the Cache
            return cache.addAll(filesToCache);
        })
    );
});


// Fired when the Service Worker starts up
self.addEventListener('activate', function(event) {

    console.log('Service Worker: Activating....');

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(key) {
                if( key !== cacheName) {
                    console.log('Service Worker: Removing Old Cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});


self.addEventListener('fetch', function(event) {

    console.log('Service Worker: Fetch', event.request.url);

    console.log("Url", event.request.url);

    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('push', function(event) {
	console.log(`event`);
	console.log(event);
if (event.data) {
    console.log('This push event has data: ', event.data.text());
  } else {
    console.log('This push event has no data.');
  }

  var title = 'New commit on Github Repo: RIL';

  var body = {
    'body': 'Click to see the latest commit',
    'tag': 'pwa',
    'icon': './images/48x48.png'
  };
  event.waitUntil(
    self.registration.showNotification(title, body)
  );
});

/* self.addEventListener('notificationclick', function(event) {
console.log("mydasdasldhasldhkl",event)
  var url = './latest.html';

  event.notification.close(); //Close the notification

  // Open the app and navigate to latest.html after clicking the notification
  event.waitUntil(
    //clients.openWindow(url)
  );

}); */

