const mongoose = require('mongoose');

var dbURL = 'mongodb://localhost:27017/TodoApp';

// connect MongoDB use mongoose
mongoose.Promise = global.Promise;
mongoose.connect(dbURL);

module.exports = { mongoose };
