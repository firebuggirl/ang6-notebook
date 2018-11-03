
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');//initiate security headers
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
// [SH] Require Passport
const passport = require('passport');


// Bring in the data model
require('./api/models/db');
// Bring in the Passport config after model is defined
require('./api/config/passport');


// Bring in the routes for the API (delete the default routes)

const angular = require('./routes/angular');
const api = require('./routes/api');

const app = express();


app.use(helmet());//get security report here: https://securityheaders.io/
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());



app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});
// ******************************************
// ROUTES
// ******************************************
// Route for Angular
app.use('/', angular);
// [SH] Use the API routes when path starts with /api

// Route for APIs go here
app.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 7777);
//app.set('port', process.env.PORT || 80);//use port 80 fpr Azure deploy

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

module.exports = app;
