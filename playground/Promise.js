const doWorkPromises = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        // resolve([1,2,3])
        reject("Unable to connect to the database")

    },2000)

})
doWorkPromises.then((result)=>{
    console.log('Succes!', result)

}).catch((error)=>{
    console.log('Error!', error)

})