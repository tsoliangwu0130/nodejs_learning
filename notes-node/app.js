console.log("Starting notes-node application.");

// require fs module
const fs = require('fs');
fs.appendFile('greetings.txt', "Hello from Node.js!");
