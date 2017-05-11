const yargs = require('yargs');

const notes = require('./notes.js');

const titleOption = {
    describe: 'Title of note',
    demand: true, // the value is required for this option
    alias: 't' // set flag for this option
};
const bodyOption = {
    describe: 'Body of note',
    demand: false,
    alias: 'b'
};
const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOption,
        body: bodyOption })
    .command('remove', 'Remove the note', {
        title: titleOption })
    .command('read', 'Read the note', {
        title: titleOption })
    .command('list', 'List all notes')
    .help()
    .argv;
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
    var message = noteRemoved ? `Note ${ argv.title } was removed!` : `Note ${ argv.title } not found.`; // shorthand for if statement
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
    var allNotes = notes.getAll();
    console.log(`Printing ${ allNotes.length } note(s)...`);
    allNotes.forEach((note) => notes.logNote(note));
} else {
    console.log('Command not recognized!');
}
