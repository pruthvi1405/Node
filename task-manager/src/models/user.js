 const mongoose=require("mongoose");
 const vslidator=require("validator")



 const User=mongoose.model('User',{
     name:{
        type:String,
        trim:true,
        required:true
     },
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
         }
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


 module.exports=User