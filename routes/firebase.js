var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');



module.exports = Subscriptions => {
  const firebaseController = require('../controllers/firebaseController')(Subscriptions);

  //var User       = require('../models/user.server.model'),
  var admin = require("firebase-admin");

  var serviceAccount = require("../ServiceAccount/service-account.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://bulletinboard-45e2b.firebaseio.com"
  });
  router.use(bodyParser.urlencoded({
    extended: false
  }));

  // parse application/json
  router.use(bodyParser.json())
  router.post('/api/subid/:id', firebaseController.POST.subscriptionHandler);
  return router;
}
