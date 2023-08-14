 const mongoose=require("mongoose");
 const validator=require("validator")
 const bcrypt=require("bcryptjs")
 const jwt=require("jsonwebtoken")

const userSchema=new mongoose.Schema({
    name:{
       type:String,
       trim:true,
       required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    password:{
       type:String,
       required:true,
       trim:true,
       validate(value){
           if (value.toLowerCase()==='password'){
               throw new Error("Cannot have this password")
           }
       },
       minlength:7
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("email is invalid")
            }
        },
        unique:true
    },
    age:{
       type:Number,
       default:0,
       validate(value){
           if(value<0){
               throw new Error("Age must be a positive number")
           }
       }
    }
})

userSchema.pre('save',async function(next){
    const user=this

    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})
userSchema.methods.toJSON=function(){
    user=this
    const userObject=user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}


userSchema.methods.generateAuthtoken=async function() {
    const user=this
    const token= jwt.sign({_id:user._id.toString()},"thisismyexpresstutorial")
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token

}

userSchema.statics.findByCredentials=async (email,password)=>{
    const user=await User.findOne({email})

    if(!user){
        throw new Error("Unable to Login")
    }
    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error("Unable to login")
    }
    return user
}

 const User=mongoose.model('User',userSchema)


 module.exports=User