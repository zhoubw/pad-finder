var socket = io();

socket.emit('request update');

/*
socket.on('room changes', function(inputs) {
    dungeonRow = '<td>' + inputs['dungeon'] + '</td>';
    idRow = '<td>' + inputs['id'] + '</td>';
    leadersRow = '<td>' + inputs['leaders'] + '</td>';
    //$('#rooms tr:last').after('<tr>' + dungeonRow + idRow + leadersRow + '</tr>');
    //$('#roomBody tr:last').after('<tr>' + dungeonRow + idRow + leadersRow + '</tr>');
    $('#roomBody').append('<tr>' + dungeonRow + idRow + leadersRow + '</tr>');
});
*/

socket.on('room update', function(rooms) {
    $('#roomBody').empty();
    console.log(rooms);
    for (var i = 0; i < rooms.length; i++) {
	var room = rooms[i];
	dungeonRow = '<td>' + room['dungeon'] + '</td>';
	idRow = '<td>' + room['id'] + '</td>';
	leadersRow = '<td>' + room['leaders'] + '</td>';
	$('#roomBody').append('<tr>' + dungeonRow + idRow + leadersRow + '</tr>');
    }
});
