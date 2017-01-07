var socket = io();
socket.emit('request update');

$('#roomBody').on('click', 'tr', function() {
    var href = $(this).attr('data-id');
    if (href) {
	window.location = '/' + href;
    }
});

socket.on('room update', function(rooms, keys) {
    $('#roomBody').empty();

    for (var i = 0; i < keys.length; i++) {
	var key = keys[i];
	var room = rooms[key];
	dungeonRow = '<td>' + room['dungeon'] + '</td>';
	leadersRow = '<td>' + room['leaders'] + '</td>';
	
	// TODO: Make this clickable
	$('#roomBody').append('<tr data-id=' + key + '>' + dungeonRow + leadersRow + '</tr>');
    }    
});

/*
$(document).ready(function() {
    $('#roomBody > tr').click(function() {
	console.log('clicked');
	
        var href = $(this).find("data-id");
	console.log(href);

        if(href) {
            window.location = href;
        }

    });
});
*/
