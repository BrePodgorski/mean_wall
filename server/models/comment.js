let mongoose = require('mongoose');

let Schema = mongoose.Schema;
//creating a model for login

let CommentSchema = new Schema({
  //adding in the user that creates this message automatic ass
  _user: { type: Schema.Types.ObjectId, ref: 'User'},
  comment: { type: String, required: true}
  //because we're tracking messaes on message and also comments, we don't need to track messages here

  //referring to things in different schemas
}, {timestamps: true})

mongoose.model('Comment', CommentSchema);
//registering model
