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
    var li = jQuery('<li></li>'); // create a new li element

    li.text(`${ message.from }: ${ message.text }`); // with this template text

    jQuery('#messages').append(li); // then add into #messages
});

// event listener: newLocationMessage
socket.on('newLocationMessage', function (message) {
    console.log('newMessage.', message);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank" >My current location</a>');

    li.text(`${ message.from }: `);
    a.attr('href', message.url);

    li.append(a);
    jQuery('#messages').append(li);
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

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    // check user is able to access geolocation api
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        // error handler
        alert('Unable to fetch location');
    });
});
