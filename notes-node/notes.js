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
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

var getNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0];
};

var getAll = () => {
  return fetchNotes();
};

var logNote = (note) => {
  console.log('----');
  console.log(`Title: ${ note.title }`);
  console.log(`Body: ${ note.body }`);
};

module.exports = {
  addNote,
  removeNote,
  getNote,
  getAll,
  logNote
};
