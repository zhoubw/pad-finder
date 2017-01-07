var socket = io();
socket.emit('request update');

$('#roomBody').on('click', 'tr', function() {
    var key = $(this).attr('data-id');
    // send flag that room has been clicked
    socket.emit('room clicked', key);
    if (key) {
	window.location = '/' + key;
    }
});

socket.on('room update', function(rooms, keys) {
    $('#roomBody').empty();

    for (var i = 0; i < keys.length; i++) {
	var key = keys[i];
	var room = rooms[key];
	dungeonRow = '<td>' + room['dungeon'] + '</td>';
	leadersRow = '<td>' + room['leaders'] + '</td>';
	
	$('#roomBody').append('<tr data-id=' + key + '>' + dungeonRow + leadersRow + '</tr>');
    }    
});
