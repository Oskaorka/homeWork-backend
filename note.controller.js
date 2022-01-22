const fs = require('fs/promises')
const path = require('path')
const chalk = require("chalk");

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await saveNote(notes)
    console.log(chalk.bgGreen('Note was added!'))

}

async function saveNote(notes) {
    await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function removeNote(id){
    const removeObject = await getNotes()
    const notes = removeObject.filter(elem => {
        return elem.id !== String(id)
    })
    await saveNote(notes)
    console.log(chalk.red(`Note with id="${id}" has been removed.`))
}
async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes))?JSON.parse(notes):[]
}
async  function printNotes() {
    const  notes = await getNotes()
    console.log(chalk.yellow('Here is the list of notes:'))
    notes.forEach(note =>{
        console.log(chalk.red( note.id,note.title))
    })
}
async function updateNote(noteData){
    const notes = await getNotes()
    const index = notes.findIndex(note => note.id === noteData.id)
    if(index >= 0) {
        notes[index] = {...notes[index], ...noteData}
        await  saveNote(notes)
        console.log(chalk.bgGreen(`Note with id="${noteData.id}" has been updated!`))
    }
    await saveNote(notes)
}


module.exports = {
    addNote, getNotes, removeNote, updateNote
}