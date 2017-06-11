/* global __dirname, process */

const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    // emit greeting message from server
    socket.emit('newMessage', generateMessage('Admin', 'Welcom to the chat app!'));

    // broadcast message from server
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));

    // event listener: createMessage
    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    // event listener: createLocationMessage
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${ port }.`);
});
