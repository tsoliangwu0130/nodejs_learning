console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require('./notes.js');

var filteredArray = _.uniq(['Tso-Liang', 1, 'Wu', 'Tso-Liang', 2, 1, 3]);
console.log(filteredArray);
console.log(_.isString(filteredArray));
console.log(_.isString('Tso-Liang Wu'));
