// require('dotenv').config({silent: true})
//
// const url = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost/project-4'

var express = require('express');
var routes = require('./routes');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var mongoose = require('mongoose') // for DB

// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// mongoose.Promise = global.Promise
// mongoose.connect(url, {
//   useMongoClient: true
// })
// .then(
//   () => { console.log('db is connected') },
//   (err) => { console.log(err) }
// )

app.use('/', routes.index);
// app.use('/users', users);
app.get('/polls/polls', routes.list);
app.get('/polls/:id', routes.poll);
app.post('/polls', routes.create);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
