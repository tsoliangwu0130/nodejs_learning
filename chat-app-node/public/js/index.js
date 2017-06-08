/* global io, jQuery */

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

jQuery('#message-form').on('submit', function(e) {
    // prevent the default behavior: not refresh the page
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {
        
    });
});
