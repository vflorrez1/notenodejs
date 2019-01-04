const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js')
const cmdOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}

const argv = yargs
    .command('add', 'adds a new note', {
        title: cmdOptions,
        body: {
            describe: 'The body of the note',
            demand: true,
            alias: 'b'
        }
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: cmdOptions
    })
    .command('remove', 'removes note from list', {
        title: cmdOptions
    }) 
    .help()
    .argv;
var command = argv._[0];

if(command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if(note) {
        console.log('note created');
        notes.logNote(note);
    } else {
        console.log('note title taken')
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`)
    allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
   var note = notes.getNote(argv.title);
   if (note) {
       console.log('Note found');
       notes.logNote(note);
   } else {
       console.log('note not found');
   }
} else if(command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Not was removed' : 'Note not found';
    console.log(message);
} else {
    console.log('not recognised');
}
