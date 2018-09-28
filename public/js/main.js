 // [START get_messaging_object]
  // Retrieve Firebase Messaging object.

  //We get this profile from firebase
  if (typeof Notification === 'undefined') {
    alert('Sorry, Push notification isn\'t supported in your browser.We can not send notification of transaction status to you.You have to mannualy check the status of transaction.Thank you.');
  }
  var config = {
    apiKey: "AIzaSyCmozsbTCrTXOu_ZxBmGs0Q3WFsVvx02pE",
    authDomain: "always-bfde9.firebaseapp.com",
    databaseURL: "https://always-bfde9.firebaseio.com",
    projectId: "always-bfde9",
    storageBucket: "always-bfde9.appspot.com",
    messagingSenderId: "996791855233"
  };
  firebase.initializeApp(config);
  const messaging = firebase.messaging();
  //This is the public key of the web app in firebase
  messaging.usePublicVapidKey('BAe6LNL-XVQl6cBGiMOUUaUt3qE4D84rN6S-529gzRwChbK3Bip7H1nIUTX_-oTTXu8U-_KqpC-UdG8mmkkH-GU');

