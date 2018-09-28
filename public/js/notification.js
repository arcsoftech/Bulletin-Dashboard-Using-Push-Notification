(function (window) {
    'use strict';
  
    //Push notification button
    var fabPushElement = document.querySelector('.fab__push');
    var fabPushImgElement = document.querySelector('.fab__image');
  
    //To check `push notification` is supported or not
    function isPushSupported() {
  
      if (Notification.permission === 'denied') {
        alert('User has blocked push notification.');
        return;
      }

      if (!('PushManager' in window)) {
        alert('Sorry, Push notification isn\'t supported in your browser.');
        return;
      }
         messaging.getToken().then(function(subscription_id) {
            if (subscription_id) {
              console.log(subscription_id);
              changePushStatus(true);
            } else {
              changePushStatus(false);
            }
          }).catch(function(err) {
            console.error('Error occurred while enabling push ', err);
          }); 
    }
    // Ask User if he/she wants to subscribe to push notifications and then
    // ..subscribe and send push notification
    function subscribePush() {
   
        if (Notification.permission === 'denied') {
          alert('User has blocked push notification.');
          return;
        }
        else
        {
          messaging.getToken().then(function(subscription_id) {
            if (subscription_id) {
              toast('Subscribed successfully.');
              console.info('Push notification subscribed.');
              console.log("Subscription Id",subscription_id)
              saveSubscriptionID(subscription_id);
              changePushStatus(true);
            } else {
              // Show permission request.
              console.log('No Instance ID token available. Request permission to generate one.');
              // Show permission UI.
              setTokenSentToServer(false);
              requestPermission();
            }
          }).catch(function(err) {
            changePushStatus(false);
            console.error('Push notification subscription error: ', err);
          });
        }

    }
    // Unsubscribe the user from push notifications
    function unsubscribePush() {
        messaging.getToken().then(function(subscription_id) {
            if(!subscription_id) {
            alert('Unable to unregister push notification.');
            return;
          }
          messaging.deleteToken(subscription_id).then(function() {
            console.log('Token deleted.');
            toast('Unsubscribed successfully.');
                  console.info('Push notification unsubscribed.');
                  console.log(subscription_id);
                  deleteSubscriptionID(subscription_id);
                  changePushStatus(false);
          }).catch(function(err) {
            console.log('Unable to delete token. ', err);
          });
          // [END delete_token]
        }).catch(function(err) {
          console.log('Error retrieving Subscription ID token. ', err);
        });
    }
    //To change status
    function changePushStatus(status) {	
      // fabPushElement.dataset.checked = status;
      // fabPushElement.checked = status;
      // if (status) {
      //   fabPushElement.classList.add('active');
      //   fabPushImgElement.src = '../images/push-on.png';
      // }
      // else {
      //  fabPushElement.classList.remove('active');
      //  fabPushImgElement.src = '../images/push-off.png';
      // }
    }
  
    //Click event for subscribe push
    // fabPushElement.addEventListener('click', function () {
    //   var isSubscribed = (fabPushElement.dataset.checked === 'true');
    //   if (isSubscribed) {
    //     unsubscribePush();
    //   }
    //   else {
    //     subscribePush();
    //   }
    // });
  
    function saveSubscriptionID(subscription_id) {
      if (!isTokenSentToServer()) {
        console.log('Sending token to server...',subscription_id);
        fetch('/api/users', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id : subscription_id })
        }).then(function(data){
          console.log(data);
          setTokenSentToServer(true);}).catch(function(err){console.log(err);});
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
      }).then(function(res){console.log(res);
        setTokenSentToServer(false);}).catch(function(err){console.log("Error deleting subscription id",err)});
    }
 
    function requestPermission() {
      console.log('Requesting permission...');
      // [START request_permission]
      messaging.requestPermission().then(function() {
        console.log('Notification permission granted.');
        subscribePush();
        // [END_EXCLUDE]
      }).catch(function(err) {
        console.log('Unable to get permission to notify.', err);
      });
      // [END request_permission]
    }
    function isTokenSentToServer() {
      return window.localStorage.getItem('sentToServer') === '1';
    }
    function setTokenSentToServer(sent) {
      window.localStorage.setItem('sentToServer', sent ? '1' : '0');
    }

    //handle notification when you are on foreground
    messaging.onMessage(function(payload) {
      console.log('Message received. ', payload);
      var data=JSON.stringify(payload.data);
      var html = '  <div class="alert alert-info alert-dismissible">';
      html+= '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
      html += '<strong>Info!</strong> '+ data;
      html += '  </div>';
      document.getElementById("notification-alert").innerHTML = html;
    });
    messaging.onTokenRefresh(function() {
      messaging.getToken().then(function(refreshedToken) {
        console.log('Token refreshed.');
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        setTokenSentToServer(false);
        changePushStatus(false);
        // Send Instance ID token to app server.
        saveSubscriptionID(refreshedToken);
        // [START_EXCLUDE]
        // Display new Instance ID token and clear UI of all previous messages.
        // [END_EXCLUDE]
      }).catch(function(err) {
        console.log('Unable to retrieve refreshed token ', err);
      });
      
    });
    isPushSupported(); //Check for push notification support
  })(window);
  
 