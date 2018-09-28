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
    push.emit('notify', "");
    res.send("request accepted for notification")
  });



  return router;
}