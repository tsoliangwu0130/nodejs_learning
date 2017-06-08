/* global __dirname, process */

const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected!');

    // emit greeting message from server
    socket.emit('newMessage', generateMessage('Admin', 'Welcom to the chat app!'));

    // broadcast message from server
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));

    // event listener: createMessage
    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server.');
    });

    // event listener: createLocationMessage
    socket.on('createLocationMessage', (coords) => {
        io.emit('newMessage', generateMessage('Admin', `${ coords.latitude }, ${ coords.longitude }`));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${ port }.`);
});
