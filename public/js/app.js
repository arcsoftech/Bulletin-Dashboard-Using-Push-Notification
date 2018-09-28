if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./firebase-messaging-sw.js')
    .then(function () {
      console.log('Service Worker Registered for Always push service');
    });
}
