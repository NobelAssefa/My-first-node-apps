const express = require('express')
require('./db/mongoose.js')
const userRouter= require('../src/routers/user')
const taskRouter = require('../src/routers/task')
const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next)=>{
//     if(req.method === 'GET'){
//         res.status(503).send('Under Maintenance!!')
//     }else{
//         next()
//     }
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log("listening in this" + port)
})

// The below code used to demonstrate the functionality of jwt

// const jwt = require('jsonwebtoken')
// const myfunction = async ()=>{
//     const token = jwt.sign({_id: "abelassefa"}, 'myfirsttrial')
//     console.log(token)
//     const data = jwt.verify(token, 'myfirsttrial' )
//     console.log(data)
// }
// myfunction()