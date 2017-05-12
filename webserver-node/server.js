const express = require('express');

var app = express();

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

app.listen(3000); // listening on port 3000
