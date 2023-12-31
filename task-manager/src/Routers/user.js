const express=require('express')
const router=new express.Router()
const User=require("../models/user")
const auth=require("../middleware/auth")
const multer=require("multer")
const sharp=require("sharp")


router.post('/users',async (req,res)=>{
    const user=await new User(req.body)
    try{
        await user.save()
        const token=await user.generateAuthtoken()
        res.status(201).send({user,token})
    }
    catch(e){
        console.log(e);
        res.status(400).send(e)
    }

})

router.post("/users/logout",auth,async (req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send(e)
    }
})
router.post("/users/logoutAll",auth,async (req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.get("/users/me",auth,async (req,res)=>{
    res.send(req.user)

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
        const token=await user.generateAuthtoken()
        res.send({user,token})
    }
    catch(e){
        res.status(400).send()
    }
})

router.patch("/users/me",auth,async (req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','age','email','password']
    const isValidOp=updates.every((update)=>allowedUpdates.includes(update)
    )
    if(!isValidOp){
        return res.status(400).send("Error, Invalid Updates")
    }
    try{
        updates.forEach((update)=>{
            req.user[update]=req.body[update]
        })
        await req.user.save()
        return res.send(req.user)
    }
    catch(e){
        res.status(500).send(e)
    }
})


router.delete("/users/me",auth,async (req,res)=>{
    try{
        await req.user.deleteOne({ _id: req.user._id });
        res.send(req.user)
    }
    catch(e){
        res.status(500).send(e)
    }
})
const upload=multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpeg|jpg)$/)){
            return cb( new Error("Invalid FIle type"))
        }
        cb(undefined,true)
    }
})
router.post("/users/me/avatar",auth,upload.single('avatar'),async (req,res)=>{
    const img= await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar=img
     await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.delete("/users/me/avatar",auth,async (req,res)=>{
    try{
        req.user.avatar=undefined
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.send(e)
    }
})


router.get("/users/:id/avatar",async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }
    catch(e){
        res.status(404).send()
    }
})
module.exports=router