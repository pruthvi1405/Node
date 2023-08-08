const express=require('express')
const path=require("path")

const publicDirectory=path.join(__dirname,"../public")

const app=express()

app.use(express.static(publicDirectory))

app.set("view engine","hbs")

app.get("/",(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:"Pruthvi"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        name:"pruthvi"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About",
        name:"Pruthvi"
    })
})

app.get("/weather",(req,res)=>{
    res.send("weather")
})

app.listen(3000,()=>{
    console.log("Server is up on port : ",3000)
})