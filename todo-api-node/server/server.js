const bodyParser = require('body-parser');
const express = require('express');
const { ObjectID } = require('mongodb');

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

// GET: /todos/:id
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((err) => {
        res.status(400).send(err);
    });
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

app.listen(3000, () => {
    console.log('Started on port 3000.');
});

module.exports = { app };
