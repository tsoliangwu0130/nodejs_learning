/* global io */

var socket = io();
socket.on('connect', function () {
    console.log('Connected to the server.');
});

socket.on('disconnect', function () {
    console.log('Disconnected from the server.');
});

// event listener: newMessage
socket.on('newMessage', function (message) {
    console.log('newMessage.', message);
});

socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi!'
}, function (data) {
    console.log(data);
});
