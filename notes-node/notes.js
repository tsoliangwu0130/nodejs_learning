const fs = require('fs');

const noteFile = 'note-data.json';

var addNote = (title, body) => {
    var notes = [];
    var note = {
        title,
        body
    };

    try {
        var noteString = fs.readFileSync(noteFile);
        notes = JSON.parse(noteString);
    } catch (e) {
        // console.log(e);
    }

    var duplicateNotes = notes.filter((note) => note.title === title); // ES6 style
    if (duplicateNotes.length === 0) {
        notes.push(note);
        fs.writeFileSync(noteFile, JSON.stringify(notes));
    }
};

var removeNote = (title) => {
    console.log('Removing note:', title);
};

var readNote = (title) => {
    console.log('Reading note:', title);
}

var getAll = () => {
    console.log('Getting all notes...');
}

module.exports = {
    addNote,
    removeNote,
    readNote,
    getAll
};
