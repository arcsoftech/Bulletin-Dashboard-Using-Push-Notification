var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-hbs');
var flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

const models = require("./models");
require("./config/passport")(passport, models.Accounts);
const indexRouter = require('./routes/index')(passport, models.Messages, models.Subscriptions);
const firebase = require('./routes/firebase')(models.Subscriptions);
var app = express();


// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine(
  'hbs',
  exphbs.express4({
    extname: '.hbs',
    defaultLayout: __dirname + '/views/layouts/default.hbs',
    // partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts'
  })
);
app.use(
  session({
    name: 'SESS_ID',
    secret: "voice",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 6000000,
      ephemeral: true
    }
  })
); // session secret

// view engine setup
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use('/firebase', firebase);
app.use(flash());
app.use('/', indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    error: err.message
  });
});

//Sync Database
models.sequelize.sync().then(function (res) {
  console.log('Db connected and synchronized')
});

module.exports = app;
