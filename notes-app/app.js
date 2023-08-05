const { type } = require('os')
const { argv } = require('process')
const yargs=require('yargs')
const notes=require('./notes.js')

yargs.version('17.7.2')

yargs.command({
    command:'add',
    describe:'Adds a new note!',
    builder:{
        title:{
            describe:"Title of Note",
            demandOption: true,
            type:'string'
        },
        body:{
            describe:"Body of the Note",
            demandOption:true,
            type:'string'
        }
    },
    handler (argv){
        notes.addNote(argv.title,argv.body)
    }
})


yargs.command({
    command:'remove',
    describe:'Removing a note!',
    builder:{
        title:{
            describe:"Title of the Note",
            demandOption:true,
            type:"string"
        }
    },
    handler (argv){
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command:"list",
    describe:"Describe a note",
    handler(){
        notes.getNotes()
    }
})

yargs.command({
    command:"read",
    describe:"Reads a note",
    builder:{
        title:{
            describe:"Title of the Note",
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

yargs.parse()