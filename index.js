const yargs = require("yargs")
const {addNote, printNotes, removeNote} = require('./note.controller')
const chalk = require('chalk')
const {command, describe} = require("yargs");
// continue from task 4
yargs.command({
    command:"add",
    describe:"Add new nte to list",
    buider: {
        title: {
            type:"string",
            describe:"Note title",
            demandOption: true
        }
    },
    handler({title}) {
        addNote(title)
    }
})
yargs.command({
    command: "list",
    describe: "Print all notes",
    async handler(){
    printNotes()
    }
})
yargs.command({
    command: 'remove',
    describe: 'Remove note by id',
    id: {
        type: "string",
        describe: "Note id",
        demandOption: true
    },
    async handler({id}) {
        removeNote(id)
    }
})

yargs.parse()

