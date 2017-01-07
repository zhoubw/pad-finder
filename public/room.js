var socket = io();
var currentKey = $(location).attr('href').match(/[^\/]*$/)[0];
socket.emit('request load', currentKey);

socket.on('room load', function(id) {
    $('body').append('<h1>' + id + '</h1>');
});
