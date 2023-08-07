const request=require('request');
const geocode=require("./utils/geocode")
const weather=require("./utils/weather")

const address=process.argv[2]

if(address==undefined){
    console.log("enter a search term")
}
else{
    geocode(address,(err,{latitude,longitude,location})=>{
        if(err){
            return console.log(err)
        }
        else{
            console.log(location)
            weather(latitude,longitude,(err,response)=>{
                if(err){
                    return console.log(err)
                }
                else{
                    console.log(response);
                }
            })
        }
    })
}









