var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let clientPath = __dirname + '\\..\\client\\';
console.log('the client static file is at ' + clientPath);
// app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(clientPath, 'build')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
