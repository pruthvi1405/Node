const express=require("express");
require("./db/mongoose")
const userRouter=require("./Routers/user")
const taskRouter=require("./Routers/task")


const app=express()

const port=process.env.PORT


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



module.exports=app;