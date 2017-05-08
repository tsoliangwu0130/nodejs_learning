var addNote = (title, body) => {
    console.log('Adding note:', title, body);
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
