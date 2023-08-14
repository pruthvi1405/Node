const express=require('express')
const router=new express.Router()
const Task=require("../models/task")

router.post('/tasks',async (req,res)=>{
    const task=new Task(req.body)
    try{
        const tasks=await task.save()
        res.send(tasks)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get("/tasks",async (req,res)=>{
    try{
        const tasks=await Task.find({})
        res.send(tasks)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get("/tasks/:id",async (req,res)=>{
    const updates=['description','completed']
    const allowed=new Object(req.body.keys())
    const isValid=updates.every((update)=>allowed.includes(update))
    if(!isValid){
        return res.status(400).send("Error, Invalid Updates")
    }
    const _id=req.params.id
    try{
    const task=await Task.find(_id)
    if(!task){
        return res.status(404).send()
    }
    updates.forEach((update)=>{
        task[update]=req.body[update]
    })
    task.save()
    res.send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
})




router.patch("/tasks/:id",async (req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['description','completed']
    const isValidOp=updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOp){
        return res.status(400).send("Error! invalid updates")
    }
    const _id=req.params.id
    try{
        const task= await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        if(!task){
            return res.status(404).send()
        }
        return res.send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.delete("/tasks/:id",async (req,res)=>{
    const _id=req.params.id
    try{
        const task=await Task.findByIdAndDelete(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports=router