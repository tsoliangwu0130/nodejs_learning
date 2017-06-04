/* global __dirname, process */

const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected!');

    // emit greeting message from server
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcom to the chat app!',
        createAt: new Date().getTime()
    });

    // broadcast message from server
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined!',
        createAt: new Date().getTime()
    });

    // event listener: createMessage
    socket.on('createMessage', (message) => {
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });
        console.log('createMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${ port }.`);
});
