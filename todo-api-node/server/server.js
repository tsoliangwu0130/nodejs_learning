const bodyParser = require('body-parser');
const express = require('express');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

var app = express();

// middleware
app.use(bodyParser.json());

// GET: /todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (err) => {
        res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000.');
});

// POST: /todos
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    // create document to collection
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err); // 400 bad request
    });
});

module.exports = { app };
