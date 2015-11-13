
'use strict';

let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
var mongoose = require('mongoose');

let apiMessage = require('./routes/api-message');
let login = require('./routes/login');

let index = require('./routes/index');
let board = require('./routes/board');

let database = process.env.MONGOLAB_URI || 'mongodb://localhost/messageBoard';
mongoose.connect(database);

let app = express();

app.set('view engine', 'jade');
app.use(express.static('public'));
//app.use('/',  express.static(bower_components'));
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/message', apiMessage);
app.use('/login', login);
app.use('/', index);
app.use('/board', board);

let port = process.env.PORT || 3000;
let listener = app.listen(port);

console.log('express in listening on port: ' + listener.address().port);

process.on('exit', function(code) {
  mongoose.disconnect();
  console.log('About to exit with code:', code);
});
