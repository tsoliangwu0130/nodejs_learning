const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
var command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log(`${ note.title } created sucessfully!`);
    } else {
        console.log(`${ argv.title } has already been used.`);
    }
} else if (command === 'remove') {
    notes.removeNote(argv.title);
} else if (command === 'read') {
    notes.readNote(argv.title);
} else if (command === 'list') {
    notes.getAll();
} else {
    console.log('Command not recognized!');
}
