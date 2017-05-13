/* global __dirname */

const express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send('<h1>Hello Express!</h1>');
});

app.get('/about', (req, res) => {
    res.send({
        name: 'Tso-Liang Wu',
        school: 'OSU'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to show the page.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
