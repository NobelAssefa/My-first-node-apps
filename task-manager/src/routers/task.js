const express = require('express')
const Tasks = require('../models/task')
const router =  new express.Router()

router.post('/tasks', async (req, res) => {
    const task = new Tasks(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    }
    catch (e) {
        res.status(404).send()

    }

})

router.get('/tasks', async (req, res) => {
    const task = await Tasks.find({})
    try {
        res.send(task)
    }
    catch (e) {
        res.status(500).send(e)
    }

})

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedupdates = ['completed', 'description']
    const isValidOperation = updates.every((upadate => allowedupdates.includes(upadate)))
    if (!isValidOperation) {
        res.status(400).send("Error: invalid update")
    }
    try {
        const task = await Tasks.findById(req.params.id)
        updates.forEach((update)=>{
            task[update]= req.body[update]

        })
        await task.save()

        if (!task) {
            res.status(404).send()
        }
        res.send(task)

    } catch (e) {
        res.status(400).send()
    }


})
router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router