//Firebase Service worker
// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
console.log("Service Worker Loaded succesfull");
importScripts('https://www.gstatic.com/firebasejs/5.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.4.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '757685153945'
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]

//Push notification when page is not opened.
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});

//Action to be performed when notification is clicked
self.addEventListener('notificationclick', function(event) {
  console.log("mydasdasldhasldhkl",event)
  var url = 'http://localhost:3001';
  event.notification.close(); //Close the notification
  // Open the app and navigate to latest.html after clicking the notification
  event.waitUntil(
    clients.openWindow(url)
  );
});


//Push notification irrespective of page is open or not
self.addEventListener('push', function(event) {
	console.log(`event`);
	console.log(event);
if (event.data) {
    console.log('This push event has data: ', event.data.text());
    console.log(event);
    var title = event.data.json().notification.title;

    var body = {
      'body': event.data.json().notification.body,
      'tag': 'pwa',
      'icon': event.data.json().notification.icon
    };
    event.waitUntil(
      self.registration.showNotification(title, body)
    );
  } else {
    console.log('This push event has no data.');
  }


});
