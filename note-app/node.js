const fs = require('fs')
const chalk = require('chalk')
const getNotes = function () {
    return 'Your notes.....'
}


//Adding a note

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicatedNotes = notes.find((note) => note.title === title)

    if(!duplicatedNotes){
        notes.push({
            title: title,
            body: body
    
        })
        saveNotes(notes)
        console.log(chalk.green("note is added"))

    } else{  
        console.log(chalk.red('the title is already used'))
    }
  
    
}


//Remove a note 

const removeNote = function(title){
    const notes = loadNotes()
    const noteTokeep = notes.filter((note)=> note.title !== title)
    if(notes.length > noteTokeep){
        console.log(chalk.green.inverse('Note removed'))
    }else{
        console.log(chalk.red.inverse('No note found!'))
    }

    saveNotes(noteTokeep)
}

// function used to list notes form json file

const listNotes =  function(){
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes:'))
    notes.forEach((note) =>{
        console.log(note.title)

    })

}

const readNotes = (title) =>{
    const notes = loadNotes()
    const wantedNote = notes.find((note)=>{ note.title === title    
    })
    if(!wantedNote){
        console.log(chalk.red.inverse("No note found!!"))
    }else{
        console.log("Title: " + chalk.green(wantedNote.title) + " " + "Body: " + wantedNote.body)
    }


}

// A function used to write the note to the json file

 const saveNotes = function(notes){

    const JSONdata = JSON.stringify(notes)
    fs.writeFileSync('note.json', JSONdata)


 }


 // loading already existing note from json file

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('note.json')
        const jsonData = dataBuffer.toString()
        return JSON.parse(jsonData)


    } catch (e) {
        return []
    }


}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote : removeNote,
    listNotes: listNotes,
    readNotes : readNotes
}
