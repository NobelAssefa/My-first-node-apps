const request =require('request')

const geocode = (address, callback)=>{
    const geocodeUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ London +"&appid=32be9e27df35f14fdd52751c6bc99413"
    request({url: geocodeUrl, json:true}, (error, {body}) =>{
       if(error){
          callback('Unable to connect', undefined)
       }else if(body.message === 'city not found' ){
          callback('city not found',undefined)
       }else{
          callback(undefined, {
             longtiude: body.coord.lon,
             latitiude: body.coord.lat,
             location: body.sys.country
          })
       }
    })
 }

 module.exports = geocode