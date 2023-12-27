const request = require('request')
const geocode = require('../weather-app/utilities/geocode')
const forcast = require('./utilities/forecast')



const location = process.argv[2]
if(!location){
   console.log('Please provide the location!')
}else{
   //  object destruction performed (response) to {latitude, logtiude, location}
   geocode(location, (error, {latitiude, longtiude, location})=>{
      if(error){
         console.log(error)
      }
      forcast(latitiude, longtiude, (error, forcastData)=>{
         if(error){
            console.log(error)
         }
   
         console.log(location)
         console.log(forcastData)
      })
   
   }
   )
   
   
   
   

}




