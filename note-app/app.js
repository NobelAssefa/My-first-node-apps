const yargs = require('yargs')
const notes = require('./node')



yargs.command({
    command: 'add',
    describe: 'add a note',
    builder:{
        title:{
            describe: 'note title',
            demandOption: true,
            type:'string'

        },
        body:{
            describe:'note body',
            demandOption: true,
            type: 'string'

        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body)
    }

}) 


yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder:{
        title:{
            describe: 'note title',
            demandOption: true,
            type:'string'

        }
       
    },
    handler(argv){
        notes.removeNote(argv.title)
    }

}) 


yargs.command({
    command: 'list',
    describe: 'list a note',
    handler(){
        notes.listNotes()
    }

}) 


yargs.command({
    command: 'read',
    describe: 'read a note',
    title:{
        describe: 'note title',
        demandOption: true,
        type:'string'

    },
    handler(argv){
        notes.readNotes(argv.title)
    }
})


yargs.parse()


