const hbs=require('hbs')
const express=require('express')
const path=require("path")
const geocode=require("./utils/geocode")
const weather=require("./utils/weather")

const publicDirectory=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,"../templates/partials")

const app=express()

app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))



app.get("/",(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:"Pruthvi"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:'Help',
        name:"Pruthvi"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About",
        name:"Pruthvi"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            Error:"Enter a search Address"
        })
    }

   geocode(req.query.address,(err,{latitude,longitude,location})=>{
        if(err){
            return  res.send({
                err:"Cannot connect to geocode api"
            })
        }
        else{
            weather(latitude,longitude,(err,response)=>{
                if(err){
                    return res.send({
                        err:"Cannot connect to weather api"
                    })
                }
                else{
                    res.send({
                        address:req.query.address,
                        location,
                        forecast:response,
                        latitude,
                        longitude
                    })
                }
            })
        }

    })
    
})

app.get("/help/*",(req,res)=>{
    res.render("error",{
        title:"Error",
        errmsg:"Help Article Not found",
        name:"Pruthvi"
    })
})


app.get("*",(req,res)=>{
    res.render("error",{
        title:"Error",
        errmsg:"Page Not Found",
        name:"Pruthvi"
    })
})

app.listen(3000,()=>{
    console.log("Server is up on port : ",3000)
})