const mongoose = require('mongoose');

var dbURL = 'mongodb://localhost:27017/TodoApp';

// connect MongoDB use mongoose
mongoose.Promise = global.Promise;
mongoose.connect(dbURL);

// create collection model (schema)
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true // remove leading or trailing spaces
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Number,
        default: null
    }
});

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

// create some sample documents
var newTodo = new Todo({
    text: '  hello'
});

var newUser = new User({
    email: '  tsoliangwu0130@gmail.com '
});

// save documents to collection
newTodo.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 4));
}, (err) => {
    console.log('Unable to save todo:', err);
});

newUser.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 4));
}, (err) => {
    console.log('Unable to save user:', err);
});
