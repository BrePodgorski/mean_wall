let express = require('express');

let app = express();

const path = require('path');

let bodyParser = require('body-parser');

//starting to use express session========

//make sure to npm install express-session

let session = require('express-session');
var sessionConfig = {
  secret: 'themostsecurekeyever', //Secret name for decoding secret and such
  resave: false, //don't resave session if no changesx were made
  saveUninitialized: true, //don't save session if there was nothing initialized
  name: 'myCookie', //
  cookie:{
    secure: false, //this need to be true, but only on https
    httpOnly: false, //forces cookies to only be used over http
    maxAge: 36000000

    //will log you out after a certain amount of time

  }
}

app.use(session(sessionConfig)); //ADD THIS
app.use(express.static(path.join(__dirname, 'public', 'dist')));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

require('./server/config/mongoose');
require('./server/config/routes')(app);

app.get('*', function (req, res){
  res.sendFile(path.resolve('public/dist/index.html'));
})

app.listen(6789, function(){
  console.log("server is listening on 6789")
})

//INitial statements ==========================
