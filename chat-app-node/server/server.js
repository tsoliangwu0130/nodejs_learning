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

    // emit the newEmail event
    socket.emit('newEmail', {
        from: 'leon@example.com',
        text: 'Hello from leon.',
        createAt: 123
    });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${ port }.`);
});
