var mongoose = require('mongoose');
//var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var ContactsSchema = new mongoose.Schema({

    name: {
      type: String,
      //type: mongoose.Schema.ObjectId,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    phone: {
      type: String
    },
    address:{
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zipcode: {
      type: String
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }

});


// Define our indexes
ContactsSchema.index({
  name: 'text', //index name field
  state: 'text' //index description field
});//


//ContactsSchema.plugin(mongoosePaginate);

var Contact = mongoose.model('Contact', ContactsSchema);//model method creates schema
module.exports = Contact;

//ContactsSchema.plugin(passportLocalMongoose, { contactnameField: 'email' });
