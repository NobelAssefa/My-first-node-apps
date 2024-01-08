const express = require('express')
require('./db/mongoose.js')
const User = require('./models/user')
const Tasks = require('./models/task')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    }
    catch (e) {
        res.status(400).send(e)

    }
})

app.get('/users', async (req, res) => {
    const user = await User.find({})

    try {
        res.status(200).send(user)
    }
    catch (e) {
        res.status(500).send(e)

    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)

        res.send(user)
    }
    catch (e) {
        res.status(500).send(e)
    }

})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Tasks(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    }
    catch (e) {
        res.status(404).send()

    }

})

app.get('/tasks', async (req, res) => {
    const task = await Tasks.find({})
    try {
        res.send(task)
    }
    catch (e) {
        res.status(500).send(e)
    }

})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Tasks.findById(_id)
        if (!task) {
            return res.status(404).send(task)
        }
        res.send(task)
    }
    catch (e) {
        res.status(500).send(e)
    }

})

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedupdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((upadate => allowedupdates.includes(upadate)))
    if (!isValidOperation) {
        res.status(400).send("Error: invalid update")
    }


    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)

    }

})

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedupdates = ['completed', 'description']
    const isValidOperation = updates.every((upadate => allowedupdates.includes(upadate)))
    if (!isValidOperation) {
        res.status(400).send("Error: invalid update")
    }
    try {
        const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            res.status(404).send()
        }
        res.send(task)

    } catch (e) {
        res.status(400).send()
    }


})
app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Tasks.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})


app.listen(port, () => {
    console.log("listening in this" + port)
})