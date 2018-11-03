const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('User');
const Contact = mongoose.model('Contact');
const ctrlAuth = require('./authentication');


const sendJSONresponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};




module.exports.contactCreate = (req, res) => {

  if (!req.payload._id) {
    // res.status(401).json({
    //   "message" : "UnauthorizedError: private profile"
    // });
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
    Contact.create(req.body, (err, post) => (err) ? next(err) : res.json(post));
  }

};
