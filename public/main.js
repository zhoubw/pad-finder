var socket = io();
socket.on('room changes', function(inputs) {
    dungeonRow = '<td>' + inputs['dungeon'] + '</td>';
    idRow = '<td>' + inputs['id'] + '</td>';
    leadersRow = '<td>' + inputs['leaders'] + '</td>';
    $('#rooms tr:last').after('<tr>' + dungeonRow + idRow + leadersRow + '</tr>');
});

