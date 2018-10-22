require('dotenv').config({ path: __dirname + '/../../.env' });
const mongoose = require('mongoose');

const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;

mongoose.connect(process.env.LOCAL_DB);//mLab connection string
//mongoose.connect(process.env.DOCKER_DB);//for Docker development change `localhost`` to `mongodb` in connection string...needs to match name of image container!!!
mongoose.set('debug', true);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

const db = mongoose.connection;
// mongo error
db.on('error', console.error.bind(console, 'connection error:'));

// let gracefulShutdown;
// let dbURI = '';
// //let dbURI = process.env.LOCAL_DB;
// if (process.env.NODE_ENV === 'production') {
//   dbURI = process.env.MONGOLAB_URI;
// }
//
// mongoose.connect(dbURI);
//
// // CONNECTION EVENTS
// mongoose.connection.on('connected', function() {
//   console.log('Mongoose connected to ' + dbURI);
// });
// mongoose.connection.on('error', function(err) {
//   console.log('Mongoose connection error: ' + err);
// });
// mongoose.connection.on('disconnected', function() {
//   console.log('Mongoose disconnected');
// });
//
// // CAPTURE APP TERMINATION / RESTART EVENTS
// // To be called when process is restarted or terminated
// gracefulShutdown = function(msg, callback) {
//   mongoose.connection.close(function() {
//     console.log('Mongoose disconnected through ' + msg);
//     callback();
//   });
// };
// // For nodemon restarts
// process.once('SIGUSR2', function() {
//   gracefulShutdown('nodemon restart', function() {
//     process.kill(process.pid, 'SIGUSR2');
//   });
// });
// // For app termination
// process.on('SIGINT', function() {
//   gracefulShutdown('app termination', function() {
//     process.exit(0);
//   });
// });
// // For Heroku app termination
// process.on('SIGTERM', function() {
//   gracefulShutdown('Heroku app termination', function() {
//     process.exit(0);
//   });
// });

// BRING IN YOUR SCHEMAS & MODELS
require('./users');
