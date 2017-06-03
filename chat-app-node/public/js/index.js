/* global io */

var socket = io();
socket.on('connect', function () {
    console.log('Connected to the server.');

    socket.emit('createEmail', {
        to: 'leon@example.com',
        text: 'Hello from Mellie'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from the server.');
});

socket.on('newEmail', function (email) {
    console.log('New email.', email);
});
