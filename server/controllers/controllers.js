//when a user logs in if they exist we'll log them in if not we create them/

var mongoose = require('mongoose');

var User = mongoose.model("User");
var Message = mongoose.model("Message");
var Comment = mongoose.model("Comment");

module.exports ={
  loginReg: (req, res) => {
    //start by trying to find the user
    User.findOne({name: req.body.name},(err, user)=>{
      //if there's not a user, it won't throw error, it'll define user as null
      if(user==null){
        let newUser = new User(req.body);
        newUser.save((err, savedUser)=>{
          if(err){
            console.log(err);
            return res.sendStatus(500);

          }else{
            req.session.user = savedUser;
            //setting user in session, naming variable user
            return res.json(savedUser);
            //if user does not exist
          }
        })
      }else{
        req.session.user= user;
        return res.json(user);
        //if user does exist
      }
      //
    })
  },
  getMessages: (req, res)=>{
    Message.find({}).populate('_user').populate({path: 'comments', populate: {path: '_user'}}).exec( (err, messages)=>{
      if(err){
        console.log(err);
        return res.sendStatus(500);

      }else{

        //setting user in session, naming variable user
        return res.json(messages);
        //if user does not exist
      }
    })
    //populating user column in comments
    //going to message models, all we're saying with first one is go get the user that created thed message
    //then we need to get comments, which also includes users who made comments which we need to populate too
  },

  createMessage: (req, res)=>{
    //user making comment, we're relying on them being in session, so we need to make sure they're in there
    if(!req.session.user){
      return res.sendStatus(401);
    }else{
      let message = new Message(req.body);
      message._user = req.session.user._id;
      message.save((err, newMessage) => {
        if(err){
          console.log(err);
          return res.sendStatus(500);
        }else{
          res.json(newMessage);
        }
      })
    }
  },
  createComment: (req, res) => {
    if(!req.session.user){
      return res.sendStatus(401);
    }
    //need to find the comment
    //go and make route first
    Message.findOne({_id: req.params.message_id}, (err, message)=>{
      if(err){
        console.log(err);
        return res.sendStatus(500);
        //if you don't find the message then send an error
      }else{
        // console.log("The message is ", message)
        //creating the comment
        let comment = new Comment(req.body);
        console.log(req.body);
        comment._user = req.session.user._id;
        //setting thed user up and assigning who it is
        comment.save( (err, savedComment)=>{
          //save the comment
          if(err){
            console.log(err);
            //if you have a problem saving the comment
            return res.sendStatus(500);

          }else{
            //if the comment saves correctly, we're pushing the comment into the comments array within messages in order to attach them
            message.comments.push(savedComment._id);
            //problem line
            message.save( (err, savedMessage)=>{
              if(err){
                console.log(err);
                return res.sendStatus(500);
              }
              return res.json(savedMessage);
            })
          }
        })

      }
    })
  },
  current: (req, res) => {
    if(!req.session.user){
      res.status(401).send("nope")
    }else{
      return res.json(req.session.user);
    }

  },
  logout: (req, res)=>{
    req.session.destroy();
    res.redirect('/');
  }
//this will always chec kto make sure thered is a user to exist

}










//end
