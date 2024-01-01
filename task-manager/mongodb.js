
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

    // db.collection('tasks').updateMany({
    //     completed: false
    // },{
    //     $set: {
    //         completed: true
    //     }
    // }).then((result)=>{
    //     console.log(result.modifiedCount)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // the above code is used to updateMany

    db.collection('tasks').deleteOne({
        description: 'task-manager'
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })

    // db.collection('users').updateOne({
    //     _id: new ObjectId('659081dec497b504c49530dc')
    // },{
    //     $set: {
    //         name: 'Mike'
    //     }
    // }).then((result)=>{
    //     console.log(result)

    // }).catch((error)=>{
    //     console.log(error)

    // })

    // the above operation performs upadataOne

    // db.collection('tasks').findOne({_id: new ObjectId("65908b4f91a1ad2c3c386416")}, (error, last_task)=>{
    //     if(error){
    //         return console.log('unable to conncet to the database')
    //     }

    //     console.log(last_task)

    // })
    // db.collection('tasks').find({completed: false}).toArray((error, notcompleted)=>{
    //     if(error){
    //         return console.log('unable to conncet to the database')
    //     }

    //     console.log(notcompleted)

    // })

    // the above code performes the read operation from crud operation



   

})

// Until this line we performed create operation form CRUD operation