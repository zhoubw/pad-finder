var socket = io();
socket.emit('request update');

socket.on('room update', function(rooms, keys) {
    $('#roomBody').empty();

    // TODO: fix loop so that it works for <k, v> pair
    /*
    for (var i = 0; i < rooms.length; i++) {
	var room = rooms[i];
	dungeonRow = '<td>' + room['dungeon'] + '</td>';
	idRow = '<td>' + room['id'] + '</td>';
	leadersRow = '<td>' + room['leaders'] + '</td>';

	// TODO: Make this clickable
	$('#roomBody').append('<tr style="outline: thin solid">' + dungeonRow + idRow + leadersRow + '</tr>');
    }
    */
    console.log(rooms);
    console.log(keys);
    for (var i = 0; i < keys.length; i++) {
	var key = keys[i];
	var room = rooms[key];
	dungeonRow = '<td>' + room['dungeon'] + '</td>';
	idRow = '<td>' + room['id'] + '</td>';
	leadersRow = '<td>' + room['leaders'] + '</td>';
	
	// TODO: Make this clickable
	$('#roomBody').append('<tr style="outline: thin solid">' + dungeonRow + idRow + leadersRow + '</tr>');
    }
    
});
