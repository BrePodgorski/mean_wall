var controller = require('./../controllers/controllers');
module.exports = app => {
  app.post('/api/login', controller.loginReg);
  app.get('/api/messages', controller.getMessages);
  app.post('/api/messages', controller.createMessage);
  app.get('/api/current', controller.current);
  app.get('/logout', controller.logout);
  //this is going to check f there is  user in session go to controller
  //go to controllers.js and take this getMessages there
  app.post('/api/comments/:message_id', controller.createComment);
}
//from component to service to routes.js to controller.js

// syntax for javascript require or importing a different file
