require('../src/db/mongoose')
const User = require('../src/models/user')
const Tasks = require('../src/models/task')
// User.findByIdAndUpdate('65932a92f1bdc11d30ca4172', {age : 3}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age: 3})

// }).then((result)=>{
//     console.log(result)

// }).catch((e)=>{
//     console.log(e)
// })

// the above code is changed to asyncwait  

const updateAndCount  = async (id, age)=>{
    const upadatedUSer = User.findByIdAndUpdate(id, {age : age})
    const count = User.countDocuments({age})
    return count
}

updateAndCount('659330e89023602de89bc258', 55).then((user)=>{
    console.log(user)

}).catch((e)=>{
    console.log(e)
})

// const findAnddelete = async (id, completed) =>{
//     const removedtask = await Tasks.findByIdAndDelete(id)
//     const countIncompleted = await Tasks.countDocuments({completed: completed})
//     return countIncompleted
// }

// findAnddelete('659331dd34535e22f0dbc9e9', true).then((task)=>{
//     console.log(task)
// }).catch((e)=>{
//     console.log(e)
// })