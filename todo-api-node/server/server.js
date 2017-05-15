const mongoose = require('mongoose');

var dbURL = 'mongodb://localhost:27017/TodoApp';

// connect MongoDB use mongoose
mongoose.Promise = global.Promise;
mongoose.connect(dbURL);

// create collection model (schema)
var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

var newTodo = new Todo({
    text: 'Eat dinner',
    completed: true,
    completedAt: 123
});

// save documents to collection
newTodo.save().then((doc) => {
    console.log('Save todo:', doc);
}, (err) => {
    console.log('Unable to save todo:', err);
});
