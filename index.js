// Setup basic express server
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
//var port = process.env.PORT || 3000;
var port = 8000;

//server.listen(port, function() {
//    console.log('Server listening at port %d', port);
//});

http.listen(port, function() {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname + '/public'});
});

app.post('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname + '/public'});
});

app.get('/newroom', function(req, res) {
    res.sendFile('newroom.html', {root: __dirname + '/public'});
});


io.on('connection', function(socket) {
    console.log('connected');


    socket.on('new room', function(inputs) {
	console.log("received: " + inputs['dungeon'] + ", " + inputs['id'] + ", " + inputs['leaders']);
	
	io.emit('room changes', inputs);
    });

});
