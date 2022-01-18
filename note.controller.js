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

    await fs.writeFile(notesPath, JSON.stringify(notes))

    /*console.log(chalk.bgYellow('Note was added !'))*/

}

async function removeNote(id){
    const removeObject = await getNotes()
    const rem = removeObject.filter(elem => {
        return elem.id !== String(id)
    })
    await fs.writeFile(notesPath, JSON.stringify(rem))
}
async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes))?JSON.parse(notes):[]
}
async  function printNotes() {
    const  notes = await  getNotes()
    console.log(chalk.yellow('Here is the list of notes:'))
    notes.forEach(note =>{
        console.log(chalk.red( note.id,note.title))
    })
}

module.exports = {
    addNote, printNotes, removeNote
}