const EventEmitter = require('events');
const _ = require('underscore');
//var User       = require('../models/user.server.model'),
var admin = require("firebase-admin");

var serviceAccount = require("../ServiceAccount/service-account.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bulletinboard-45e2b.firebaseio.com"
});
class Push extends EventEmitter {}

const NotifyHandler = (userIDArray, message) => {
  var user_ids = userIDArray;

  console.log("User Ids", user_ids);

  admin.messaging().sendToDevice(user_ids, message)
    .then((response) => {
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
}



module.exports = Subscriptions => {
  const push = new Push();
  push.on('msg', data => {
    console.log(data)
    var message = {
      data: {
        score: '850',
        time: '2:45'
      },
      notification: {
        title: 'Message Alert',
        body: 'Message alert from bulletin board',
        icon: 'images/notify.png'
      }
    }
    push.emit('notify', message)
  })
  push.on('fileUpload', data => {
    var message = {
      data: {
        score: '850',
        time: '2:45'
      },
      notification: {
        title: 'Message Alert',
        body: 'New Presentation',
        icon: 'images/notify.png'
      }
    }
    push.emit('notify', message)
  })
  push.on('notify', message => {
    Subscriptions.findAll({
      attributes: ['Subid'],
      raw: true,
    }).then(subids => {
      let subidArray = _.pluck(subids, 'Subid')
      console.log(subidArray);
      NotifyHandler(subidArray, message);
    })
  })
  return push
};