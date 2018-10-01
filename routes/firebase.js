var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
  extended: false
}));
module.exports = Subscriptions => {
  const firebaseController = require('../controllers/firebaseController')(Subscriptions);
  const push = require('../events/push')(Subscriptions);
  // parse application/json
  router.use(bodyParser.json())
  router.post('/subid', firebaseController.POST.subscriptionHandler);
  router.get('/notify', (req, res) => {
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
    push.emit('notify', message);
    res.send("request accepted for notification")
  });



  return router;
}