var socket = io();
var currentKey = $(location).attr('href').match(/[^\/]*$/)[0];
var loaded = false;

socket.emit('request load', currentKey);

socket.on('room load', function(id) {
    if (!loaded) {
	loaded = true;
	$('body').append('<h1>' + id + '</h1>');
    }
});
