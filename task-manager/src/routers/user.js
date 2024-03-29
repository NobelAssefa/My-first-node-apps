const express = require('express')
const User = require('../models/user')
const router =  new express.Router()
const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        
        res.status(201).send({user, token})
    }
    catch (e) {
        res.status(400).send(e)

    }
})


router.post('/users/login', async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
})


router.get('/users/me', auth , async (req, res) => {
    res.send(req.user)
})

router.post('/users/logout', auth, async(req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.usertoken !== req.token
        })
        await req.user.save()
        res.send()

    }catch(e){
        res.status(500).send()
    }


})

router.post('/users/logout/all', auth, async(req,res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()

    }catch(e){
        res.status(500).send()
    }
})

router.patch('/users/me', auth,  async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedupdates = ['name', 'email', 'age', 'password']
    const isValidOperation = updates.every((upadate => allowedupdates.includes(upadate)))
    if (!isValidOperation) {
        res.status(400).send("Error: invalid update")
    }
    try {

        updates.forEach((update)=>{
            req.user[update]= req.body[update]
        })
        await req.user.save()
        
        res.send(req.user)

    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router