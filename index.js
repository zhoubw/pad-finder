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

app.get('/:roomKey', function(req, res, next) {
    res.sendFile('room.html', {root: __dirname + '/public'});
});

app.param('roomKey', function(req, res, next, roomKey) {
    next();
});

io.on('connection', function(socket) {
    console.log('connected');

    // adding a room
    socket.on('new room', function(inputs) {
	//console.log("received: " + inputs['dungeon'] + ", " + inputs['id'] + ", " + inputs['leaders']);	

	inputs['clicked'] = false;
	var key = crypto.randomBytes(4).toString('hex');
	rooms[key] = inputs;
	keys.unshift(key);
	
	io.emit('room update', rooms, keys);
	io.emit('redirect to room', {'key': key, 'id': inputs['id']});
    });

    // lobby requests update
    socket.on('request update', function() {
	io.emit('room update', rooms, keys);
    });

    // room requests load
    socket.on('request load', function(key) {
	var room = rooms[key];

	if (room) {
	    id = room['id'];
	    io.emit('room load', id);
	    
	    // delete room on click
	    if (room['clicked']) {
		removeRoomByKey(key);
	    }
	}	
    });
    
    // flag that room has been clicked
    socket.on('room clicked', function(key) {
	/*
	var index = keys.indexOf(key);
	if (index > -1) {
	    keys.splice(key, 1);
	}
	delete rooms[key];
	*/
	rooms[key]['clicked'] = true;
    });

    // delete room when release is requested
    socket.on('request release', function(key) {
	removeRoomByKey(key);
    });
});


function removeRoomByKey(key) {
    var index = keys.indexOf(key);
    if (index > -1) {
	keys.splice(key, 1);
    }
    delete rooms[key];
    io.emit('room update', rooms, keys);
}
