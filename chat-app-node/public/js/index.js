/* global io, jQuery, moment, Mustache */

var socket = io();

function scrollToBottom() {
    // selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    // heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    console.log('Connected to the server.');
});

socket.on('disconnect', function () {
    console.log('Disconnected from the server.');
});

// event listener: newMessage
socket.on('newMessage', function (message) {
    // **** stupid way ****
    // var li = jQuery('<li></li>'); // create a new li element
    // li.text(`${ message.from } ${  formattedTime }: ${ message.text }`); // with this template text
    // jQuery('#messages').append(li); // then add into #messages

    // **** better way using Mustache render template ****
    var formattedTime = moment(message.createAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

// event listener: newLocationMessage
socket.on('newLocationMessage', function (message) {
    // **** stupid way ****
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank" >My current location</a>');
    // li.text(`${ message.from } ${  formattedTime }: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);

    // **** better way using Mustache render template ****
    var formattedTime = moment(message.createAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-form').on('submit', function(e) {
    var messageTextbox = jQuery('[name=message]');

    // prevent the default behavior: not refresh the page
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    // check user is able to access geolocation api
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...'); // disable the button while fetching geodata

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location'); // re-enabling the button
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location'); // error handler
    });
});
