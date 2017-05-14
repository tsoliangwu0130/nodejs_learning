const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.status(404).send({
        error: 'Page not found.',
        name: 'Todo App v1.0'
    });
});

app.get('/users', (req, res) => {
    res.send([{
        name: 'Leon',
        age: 28
    },{
        name: 'Mellie',
        age: 22
    },{
        name: 'Furball',
        age: 1
    }]);
});

app.listen(3000);
module.exports.app = app;
