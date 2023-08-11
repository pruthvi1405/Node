
const {MongoClient,ObjectId}=require("mongodb-legacy")
const connection="mongodb://127.0.0.1:27017"
const databaseName="task-manager"

const id=new ObjectId()
console.log(id.getTimestamp())
MongoClient.connect(connection,{useNewUrlParser:true},(err,client)=>{
    if(err){
        return console.log(err);
    }
    const db=client.db(databaseName)
    const collection=db.collection('tasks')
    collection.find({completed:false}).count((err,count)=>{
        console.log(count);
    })
    
})