console.log("Starting notes-node application.");

const fs = require('fs');
const os = require('os');

var user = os.userInfo();

fs.appendFile('greetings.txt', `Hello ${ user.username }!`);
