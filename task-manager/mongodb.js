
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectId
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


// const id = new ObjectId()
// console.log(id)
//  the above two lines demonstrate  generating id and what is it like

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client)=>{
    if(error){
        console.log('unable to connect to database')
    }
    const db = client.db(databaseName)

    db.collection('users').findOne({_id : new ObjectId("659081dec497b504c49530dc")}, (error, user)=>{
        if(error){
            return console.log("unable to conncet to the database")
        }
        console.log(user)

    })

    // db.collection('users').insertOne({
    //     name:'Abel',
    //     age:'24'
    // })
    // console.log("Created!!")

// used to insert one document

    // db.collection('tasks').insertMany([{
    //     description: 'Note-app',
    //     completed: true
    // },{
    //     description: 'weather-app',
    //     completed: true
    // },{
    //     description: 'task-manager',
    //     completed: false
    // }],(error,result)=>{
    //     if(error){
    //         return console.log("Unable to insert document")
    //     }
    //     console.log(result.ops)
        

    // })
    

})

// Until this line we performed create operation form CRUD operation