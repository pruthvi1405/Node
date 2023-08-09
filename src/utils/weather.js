const request=require("request")

const weather=(latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=c7a087390791c3df343c8aff13d850b6&query="+latitude+","+longitude;
    request({url:url,json:true},(err,{body})=>{
        if(err){
            callback("cannot connect to the weather api",undefined);
        }
        else if(body==undefined){
            callback("no response from the weather api",undefined);
        }
        else{
            callback(undefined,body.daily.data[0].summary+ "("+body.current.weather_descriptions[0]+"). The temperature is "+body.current.temperature+" degree Celcius")
        }
    })

}
module.exports=weather    