
require('dotenv').config({ path: __dirname + '/../../.env' });
const mongoose = require( 'mongoose' );
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;

var mongooseUniqueValidator = require('mongoose-unique-validator');

//const userSchema = new mongoose.Schema({
var schema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String,
  //notes: [{type: Schema.Types.ObjectId, ref: 'Note'}]
  contacts: [{type: Schema.Types.ObjectId, ref: 'Contact'}]
  // foundingDate: {
  //   type : Date,
  //   default: Date.now
  // }

});

schema.methods.setPassword = function(password){
//userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

schema.methods.validPassword = function(password) {
//userSchema.methods.validPassword = function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};


schema.methods.generateJwt = function() {
//userSchema.methods.generateJwt = function() {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
};


schema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('User', schema);
//mongoose.model('User', userSchema);
