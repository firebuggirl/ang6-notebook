require('dotenv').config({ path: __dirname + '../.env' });
const express = require('express');
const router = express.Router();
//var jwt = require('jsonwebtoken');
const jwt = require('express-jwt');
const auth = jwt({
  secret: process.env.SECRET,
  userProperty: 'payload'
});
const passport = require('passport');

const bodyParser = require("body-parser");
const mongoose = require('mongoose');
//const cookieParser = require('cookie-parser');
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;


const User = require('../api/models/users');
//const Note = require('../api/models/note');
const Contact = require('../api//models/Contact.js');


const ctrlProfile = require('../api/controllers/profile');
const ctrlAuth = require('../api/controllers/authentication');
const ctrlContact = require('../api/controllers/contact-list');
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/meanAuth", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");


});


// router.all('/*', function(req, res, next){
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//   next();
// });


// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//router.get('/notebook', ctrlProfile.profileRead);

// router.get('/notebook', (req, res) => {
//     res.status(200).json({ status: 200, result: 'success' });
// });
//
//
// router.post('/notebook', (req, res, next) => {
//     Note.create(req.body, (err, post) => (err) ? next(err) : res.json(post));
// });

// GET ALL contacts
router.get('/contact', (req, res, next) => {
   Contact.find((err, contacts) => (err) ? next(err) : res.json(contacts));
});


// GET A Contact
router.get('/contact/:id', (req, res, next) => {
   Contact.findById(req.params.id, (err, post) => (err) ? next(err) : res.json(post));
});

// SAVE A contact
router.post('/contact', (req, res, next) => {
   Contact.create(req.body, (err, post) => (err) ? next(err) : res.json(post));
});

// UPDATE Contact
router.put('/contact/:id', (req, res, next) => {
   Contact.findByIdAndUpdate(req.params.id, req.body, (err, post) => (err) ? next(err) : res.json(post));
});

// DELETE A Contact
router.delete('/contact/:id', (req, res, next) => {
   Contact.findByIdAndRemove(req.params.id, req.body, (err, post) => (err) ? next(err) : res.json(post));
});



// router.post('/contact', function (req, res, next, result) {
//   var decoded = jwt.decode(req.query.token);
//
//
//     User.findById( decoded.user._id, function (err, user) {
//         if (err) {
//             return res.status(500).json({
//                 title: 'An error occurred',
//                 error: err
//             });
//         }
//
//
//             Contact.create(req.body, (err, post) => (err) ? next(err) : res.json(post));
//             //user.contacts.push(result);
//             user.contacts.push(
//                mongoose.Types.ObjectId(result._id)
//                );
//             user.save();
//             res.status(201).json({
//                 message: 'Saved contact',
//                 obj: result
//             });
//         //});
//     });
//
//
// });


// UPDATE Contact
router.put('/contact/:id', (req, res, next) => {
   Contact.findByIdAndUpdate(req.params.id, req.body, (err, post) => (err) ? next(err) : res.json(post));
});

// DELETE A Contact
router.delete('/contact/:id', (req, res, next) => {
   Contact.findByIdAndRemove(req.params.id, req.body, (err, post) => (err) ? next(err) : res.json(post));
});



module.exports = router;
