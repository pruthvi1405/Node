
// const {MongoClient,ObjectId}=require("mongodb-legacy")
// const connection="mongodb://127.0.0.1:27017"
// const databaseName="task-manager"

// const id=new ObjectId()
// console.log(id.getTimestamp())
// MongoClient.connect(connection,{useNewUrlParser:true},(err,client)=>{
//     if(err){
//         return console.log(err);
//     }
//     const db=client.db(databaseName)
//     const collection=db.collection('tasks')
//     collection.find({completed:false}).count((err,count)=>{
//         console.log(count);
//     })
    
// })

// const Task=require("./src/models/task")
// require("./src/db/mongoose")

// const deleteTaskAndCount=async(id)=>{
//     const removed=await Task.findByIdAndDelete(id)
//     const count=await Task.count({completed:false})
//     return count

// }

// deleteTaskAndCount('64d6a5d4257b7ca052df532c').then((res)=>{
//     console.log(res)
// }).catch((er)=>{
//     console.log(er)
// })