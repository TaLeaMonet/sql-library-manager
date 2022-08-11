var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Sequelize = require('sequelize');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



/* Create new instance of DB */
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'library.db'
});

/* Test DB connection */
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

/* Sync model to DB */
(async () => {
  await sequelize.sync();
  try {
    console.log('The table for Book model was just created!')
    } catch (error) {
    console.error('There was a problem creating this table: ', error);
  }
})();


/* catch 404 and forward to error handler */
app.use(async(req, res, next) => {
  const err = await new Error('Page Not Found')
  err.status = 404;
  res.render('page-not-found', { err });
  next(createError(404));
});

/* error handler */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if(err.status !== 404) {
    err.status = 500;
    err.message = err.message; 
    console.log(err.status, err.message);
  }
  // render the error page
  res.status(err.status || 500);
  res.render('error', { err });
});

module.exports = app;
