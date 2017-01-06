var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
//var port = process.env.PORT || 3000;
var port = 8000;

// For generating random strings
const crypto = require('crypto');
//console.log(crypto.randomBytes(4).toString('hex'));

//server.listen(port, function() {
//    console.log('Server listening at port %d', port);
//});

var rooms = {};
// for preserving order
var keys = [];

http.listen(port, function() {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile('main.html', {root: __dirname + '/public'});
});

app.post('/', function(req, res) {
    res.sendFile('main.html', {root: __dirname + '/public'});
});

app.get('/newroom', function(req, res) {
    res.sendFile('newroom.html', {root: __dirname + '/public'});
});

app.get('/:roomId/id', function(req, res) {
    res.sendFile('room.html', {root: __dirname + '/public'});
});

io.on('connection', function(socket) {
    console.log('connected');

    // adding a room
    socket.on('new room', function(inputs) {
	console.log("received: " + inputs['dungeon'] + ", " + inputs['id'] + ", " + inputs['leaders']);	

	var id = crypto.randomBytes(4).toString('hex');
	//rooms.unshift({id: inputs});
	rooms[id] = inputs;
	keys.unshift(id);
	
	io.emit('room update', rooms, keys);	
    });

    socket.on('request update', function() {
	io.emit('room update', rooms, keys);
    });

});
