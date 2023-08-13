const express=require('express')
const router=new express.Router()
const User=require("../models/user")

router.post('/users',async (req,res)=>{
    const user= new User(req.body)
    try{
        const users=await user.save()
        res.status(201).send(users)
    }
    catch(e){
        res.status(400).send(e)
    }

})

router.get("/users",async (req,res)=>{
    try{
        const users=await User.find({})
        res.send(users)
    }
    catch(e){
        res.status(500).send(e)
    }

})

router.get("/users/:id",async (req,res)=>{
    const _id=req.params.id
    try{
        const user=await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }
   catch(e){
        res.status(500).send(e)
    }
})

router.post("/users/login",async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        res.send(user)
    }
    catch(e){
        res.status(400).send()
    }
})

router.patch("/users/:id",async (req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','age','email','password']
    const isValidOp=updates.every((update)=>allowedUpdates.includes(update)
    )
    const _id=req.params.id
    if(!isValidOp){
        return res.status(400).send("Error, Invalid Updates")
    }
    try{
        const user= await User.find(_id)
        if(!user){
            return res.status(404).send()
        }
        updates.forEach((update)=>{
            user[update]=req.body[update]
        })

        user.save()
        return res.send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})


router.delete("/users/:id",async (req,res)=>{
    const _id=req.params.id
    try{
        const user=await User.findByIdAndDelete(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})


module.exports=router