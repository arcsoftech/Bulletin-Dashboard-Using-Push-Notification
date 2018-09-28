(function (window) {
  'use strict';

  //handle notification when you are on foreground
  messaging.onMessage(function (payload) {
    console.log('Message received. ', payload);
    const type = payload.data.type;
    window.localStorage.setItem('bulletinType', type);
    if(type == 'message') {
      window.localStorage.setItem('bulletinMsg', JSON.stringify(payload.data.message));
      $('#messageBoardContent').html(payload.data.message);
      $('#outerContainer').hide();
      $('#messageBoard').show();
    }
    else {
      location.reload();
    }
  });

  //To check `push notification` is supported or not
  function isPushSupported() {

    if (Notification.permission === 'denied') {
      alert('User has blocked push notification.');
      return;
    }

    if (typeof Notification === 'undefined') {
      alert('Sorry, Push notification isn\'t supported in your browser.');
      return;
    }
    console.log("Inside push support test")
    messaging.getToken().then(function (subscription_id) {
      if (subscription_id) {
        console.log(subscription_id);
        subscribePush();
        //changePushStatus(true);
      } else {
        requestPermission();
        //changePushStatus(false);
      }
    }).catch(function (err) {
      console.error('Error occurred while enabling push ', err);
    });
  }
  // Ask User if he/she wants to subscribe to push notifications and then
  // ..subscribe and send push notification
  function subscribePush() {

    if (Notification.permission === 'denied') {
      alert('User has blocked push notification.');
      return;
    } else {
      console.log("Inside Subscribe function")
      messaging.getToken().then(function (subscription_id) {
        if (subscription_id) {
          console.info('Push notification subscribed.');
          console.log("Subscription Id", subscription_id)
          saveSubscriptionID(subscription_id);
          //changePushStatus(true);
        } else {
          // Show permission request.
          console.log('No Instance ID token available. Request permission to generate one.');
          // Show permission UI.
          setTokenSentToServer(false);
          requestPermission();
        }
      }).catch(function (err) {
        //changePushStatus(false);
        console.error('Push notification subscription error: ', err);
      });
    }

  }
  // Unsubscribe the user from push notifications
  function unsubscribePush() {
    messaging.getToken().then(function (subscription_id) {
      if (!subscription_id) {
        alert('Unable to unregister push notification.');
        return;
      }
      messaging.deleteToken(subscription_id).then(function () {
        console.log('Token deleted.');

        console.info('Push notification unsubscribed.');
        console.log(subscription_id);
        deleteSubscriptionID(subscription_id);
        //changePushStatus(false);
      }).catch(function (err) {
        console.log('Unable to delete token. ', err);
      });
      // [END delete_token]
    }).catch(function (err) {
      console.log('Error retrieving Subscription ID token. ', err);
    });
  }

  //Click event for subscribe push

  function saveSubscriptionID(subscription_id) {
    if (!isTokenSentToServer()) {
      console.log('Sending token to server...', subscription_id);
      fetch('/firebase/subid', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: subscription_id
        })
      }).then(function (data) {
        console.log(data);
        setTokenSentToServer(true);
      }).catch(function (err) {
        console.log(err);
      });
    } else {
      console.log('Token already sent to server so won\'t send it again ' +
        'unless it changes');
    }
  }

  function deleteSubscriptionID(subscription_id) {
    fetch('/api/users?subscriptionID=' + subscription_id, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      console.log(res);
      setTokenSentToServer(false);
    }).catch(function (err) {
      console.log("Error deleting subscription id", err)
    });
  }

  function requestPermission() {
    swal({
      title: 'Enable Push Notification',
      text: "Push notification is require so that we can send you the status of transaction in realtime.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Enable'
    }).then((result) => {
      if (result.value) {
        console.log('Requesting permission...');
        // [START request_permission]
        messaging.requestPermission().then(function () {
          console.log('Notification permission granted.');
          subscribePush();
          // [END_EXCLUDE]
        }).catch(function (err) {
          console.log('Unable to get permission to notify.', err);
        });
      }
    })

    // [END request_permission]
  }

  function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') === '1';
  }

  function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? '1' : '0');
  }


  messaging.onTokenRefresh(function () {
    messaging.getToken().then(function (refreshedToken) {
      console.log('Token refreshed.');
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      setTokenSentToServer(false);
      //changePushStatus(false);
      // Send Instance ID token to app server.
      saveSubscriptionID(refreshedToken);
      // [START_EXCLUDE]
      // Display new Instance ID token and clear UI of all previous messages.
      // [END_EXCLUDE]
    }).catch(function (err) {
      console.log('Unable to retrieve refreshed token ', err);
    });

  });
  //Check for push notification support
  isPushSupported();
})(window);
