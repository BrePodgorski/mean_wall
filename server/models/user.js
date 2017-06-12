let mongoose = require('mongoose');

let Schema = mongoose.Schema;
//creating a model for login

let UserSchema = new Schema({
  name: {type: String, required: [true, "You have to put in your name."]},
  //putting in custom error message if they do not fulfill the required thing
  //only logging in and out with their name
  // comments: [] < -- if we want to track all comments someone made
}, {timestamps: true})

mongoose.model('User', UserSchema);
//registering model
