const request = require('request')

const forcast = (lat, lon, callback)=>{
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon="+ lon +"&appid=fe8828076d2641afaa265e67ccf74c05&unit=si"
    //  here we performed object shorthand and object destruction
    request({url, json:true}, (error, {body})=>{
       if(error){
          callback('unable to connect')
       }else if(body.message === 'nothing to geocode'){
          callback('unable to find location')
       }else{
          callback(undefined, "its currently  " + body.main.temp + "  degree out")
       }
    })
 }

 module.exports = forcast