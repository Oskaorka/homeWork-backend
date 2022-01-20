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
async function editNote(title,id){
    const removeObject = await getNotes()
    const notes = removeObject.map(elem => {
         if(elem.id === String(id)){
            const  elem = {title: title, id: id}
             return elem
        }
         return elem
    })
/*    const notes = removeObject.map(elem => {
        console.log(elem)
        if(elem.id === id){

            return  console.log({title: elem.title, id:id})
        }
        return elem
    })*/
    await saveNote(notes)
}


module.exports = {
    addNote, getNotes, removeNote, editNote
}