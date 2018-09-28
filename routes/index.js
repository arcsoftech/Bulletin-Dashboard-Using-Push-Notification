var express = require('express');
var router = express.Router();

module.exports = (Passport,Messages) => {
  const indexController = require('../controllers/indexController')(Messages);

  /* GET home page. */
  router.get('/', indexController.GET.indexHandler);

  /* GET Login page. */
  router.get('/login', indexController.GET.loginHandler);

  /* GET Register page. */
  router.get('/register', indexController.GET.registerHandler);

 /* GET Logout page. */
  router.get('/logout', indexController.GET.logoutHandler);

  /* GET Form Upload page. */
  router.get('/dashboard',Passport.authenticate('JWT', {
    failureFlash: true,
    failureRedirect: 'login'
  }), indexController.GET.dashboardHandler);

  /* POST Login page. */
  router.post('/login',Passport.authenticate('local-signin', {
    failureFlash: true,
    failureRedirect: 'login'
  }), indexController.POST.loginHandler);

  /* POST Register form. */
  router.post('/register', Passport.authenticate('local-signup', {
    failureFlash: true,
    failureRedirect: 'register'
  }),indexController.POST.registerHandler);

  /* POST Login page. */
  const multer = require('multer');
  const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'public/assets/')
      },
      filename: (req, file, cb) => {
        cb(null, 'Quarterly_Report_Sep 18_V1.4.pdf')
      }
  });
  const upload = multer({storage: storage});
  router.post('/pdf_form', upload.single('file'), (req, res, next) => {
    req.flash('success','PDF uploaded successfully.');
    res.redirect('dashboard');
  });

  router.post('/push_message', Passport.authenticate('JWT', {
    failureFlash: true,
    failureRedirect: 'login'
  }),indexController.POST.pushMessageHandler);

  return router;
}