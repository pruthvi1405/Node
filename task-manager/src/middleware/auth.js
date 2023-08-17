const jwt=require("jsonwebtoken")
const User=require("../models/user")

const auth=async (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','').trim()
        const decoded=jwt.verify(token,process.env.JWT)
        const user=await User.findOne({_id:decoded._id,'tokens.token':token})
        if(!user){
            throw new Error("No Auth")
        }
        req.user=user
        req.token=token
        next()
        
    }
    catch(e){
        res.status(401).send({error:'Not authenticated'})
    }
}

module.exports=auth