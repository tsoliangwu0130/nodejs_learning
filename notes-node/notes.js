const fs = require('fs');

const noteFile = 'note-data.json';

var fetchNotes = () => {
    // prevent the app from crashing if the noteFile doesn't exist
    try {
        var noteString = fs.readFileSync(noteFile);
        return JSON.parse(noteString);
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync(noteFile, JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    // avoid creating duplicated notes
    var duplicateNotes = notes.filter((note) => note.title === title); // ES6 style
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
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
