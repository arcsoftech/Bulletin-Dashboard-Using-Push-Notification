 // [START get_messaging_object]
  // Retrieve Firebase Messaging object.

  //We get this profile from firebase
  if (typeof Notification === 'undefined') {
    alert('Sorry, Push notification isn\'t supported in your browser.We can not send notification of transaction status to you.You have to mannualy check the status of transaction.Thank you.');
  }
  var config = {
    apiKey: "AIzaSyB9e5JRiRQ4tJkZSzwI_ZNC-AwEGO7QF5Y",
    authDomain: "bulletinboard-45e2b.firebaseapp.com",
    databaseURL: "https://bulletinboard-45e2b.firebaseio.com",
    projectId: "bulletinboard-45e2b",
    storageBucket: "bulletinboard-45e2b.appspot.com",
    messagingSenderId: "631853451147"
  };
  firebase.initializeApp(config);
  const messaging = firebase.messaging();
  //This is the public key of the web app in firebase
  messaging.usePublicVapidKey('BAe6LNL-XVQl6cBGiMOUUaUt3qE4D84rN6S-529gzRwChbK3Bip7H1nIUTX_-oTTXu8U-_KqpC-UdG8mmkkH-GU');

