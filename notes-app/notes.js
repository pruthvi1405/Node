const fs=require('fs')
const addNote=(title,body)=>{
    const notes=loadNotes()
    const duplicate=notes.filter((note)=>{
        return title==note.title
    })

    if (duplicate.length===0){
    
    notes.push({
        title:title,
        body:body
    })
    saveNotes(notes)
}
else{
    console.log("duplicate notes cannot be added")
}

}
const getNotes=()=>{
    const notes=loadNotes()
    console.log(notes)
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

module.exports={addNote,getNotes,removeNote}