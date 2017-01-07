var socket = io();
var currentKey = $(location).attr('href').match(/[^\/]*$/)[0];
var loaded = false;

socket.emit('request load', currentKey);

socket.on('room load', function(id) {
    if (!loaded) {
	loaded = true;
	$('body').append('<h1>PAD room ID: ' + id + '</h1>');
    }
});

$('#release').submit(function() {
    socket.emit('request release', currentKey);
});
