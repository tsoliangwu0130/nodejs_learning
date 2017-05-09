const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
var command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log(`Note ${ note.title } created sucessfully!`);
        notes.logNote(note);
    } else {
        console.log(`Note ${ argv.title } has already been used.`);
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? `Note ${ argv.title } was removed!` : `Note ${ argv.title } not found.` // shorthand for if statement
    console.log(message);
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log(`Note ${ note.title } found!`);
        notes.logNote(note);
    } else {
        console.log(`Note ${ argv.title } not found.`);
    }
} else if (command === 'list') {
    notes.getAll();
} else {
    console.log('Command not recognized!');
}
