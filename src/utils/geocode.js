const request = require("request");

const geocode=(search,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+search+".json/?access_token=pk.eyJ1IjoibmlyYW5qYW5wcjEyIiwiYSI6ImNsa3o5ZzUxbjBqejYzbW14bHpkNndxeDUifQ.2iUBF16rRoxwieI78mTJiw"
    request({url:url,json:true},(err,{body})=>{
        if(err){
            callback("Cannot connect to the geocode api",undefined)
        }
        else if(body.features.length===0){
            callback("Invalid search term",undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}
module.exports=geocode