var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

let httpServer= require('http').Server(app);
let io = require('socket.io')(httpServer);

httpServer.listen(4000);

io.on('connection',  (socket)=>{
    console.log('client connect server, ok!');

    socket.on('client message', (data)=>{
        io.emit('receive message', data)
      });
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'build')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
