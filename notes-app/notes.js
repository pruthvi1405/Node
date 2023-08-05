const fs=require('fs')
const chalk=require('chalk')
const addNote=(title,body)=>{
    const notes=loadNotes()
    const duplicate=notes.filter((note)=>{
        return title==note.title
    })

    debugger

    if (duplicate.length===0){
    
    notes.push({
        title:title,
        body:body
    })
    saveNotes(notes)
    console.log(chalk.green.inverse("Note added"))
}
else{
    console.log(chalk.red.inverse("duplicate notes cannot be added"))
}

}
const getNotes=()=>{
    const notes=loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    });
}

const saveNotes=(notes)=>{
    const dataJSON=JSON.stringify(notes);
    fs.writeFileSync('db.json',dataJSON)
}

const loadNotes=()=>{
    try{
        const dataBuffer=fs.readFileSync('db.json')
        const dataJSON=dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }
    

}

const removeNote=(title)=>{
    const notes=loadNotes()
    if (notes.length===0){
        console.log("There are no Notes")
        return
    }
    const updatedNotes=notes.filter((note)=>{
        return note.title!=title
    })
    saveNotes(updatedNotes)
}

const readNote=(title)=>{
    const notes=loadNotes();
    const note=notes.find((note)=>{
        return note.title===title;
    })
    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }else{
        console.log(chalk.inverse.red("No note found"))
    }
}

module.exports={addNote,getNotes,removeNote,readNote}