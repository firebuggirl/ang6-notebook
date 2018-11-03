var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    note: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
    // insertedAt: {
    //   type : Date,
    //   default: Date.now
    // }
});


schema.post('remove', function (note) {
    User.findById(note.user, function (err, user) {
        user.notes.pull(note);
        user.save();
    });
});


module.exports = mongoose.model('Note', schema);
