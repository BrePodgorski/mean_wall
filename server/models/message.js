let mongoose = require('mongoose');

let Schema = mongoose.Schema;
//creating a model for login

let MessageSchema = new Schema({
  //adding in the user that creates this message automatic ass
  _user: { type: Schema.Types.ObjectId, ref: 'User'},
  message: { type: String, required: true},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
  //referring to things in different schemas
}, {timestamps: true})

mongoose.model('Message', MessageSchema);
//registering model
