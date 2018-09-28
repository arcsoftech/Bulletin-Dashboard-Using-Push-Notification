 // [START get_messaging_object]
  // Retrieve Firebase Messaging object.

  //We get this profile from firebase
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
  messaging.usePublicVapidKey('BLIBxIdO0JXu9eaBxj0jyZyaW6Xo4xm1sBjFOhBe4q3xmYjn6Hj0nPj56FQ9i6KZzPElVmXbjYPHEeguFVubYvs');
