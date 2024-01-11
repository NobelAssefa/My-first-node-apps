const mongoose = require('mongoose')
const validator = require("validator")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Tasks = require('../models/task')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        unique:true,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid!!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        tirm: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('The password field can not contain the word password')
            }

        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age can't be a negative number")
            }

        }
    },
    tokens: [{
        usertoken: {
            type: String,
            required: true
        }
    }]
},{
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField:'_id',
    foreignField:'owner'

})
userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const usertoken = jwt.sign({_id: user._id.toString()}, "userauthtoken")
    user.tokens = user.tokens.concat({usertoken})
    await user.save()
    return usertoken

}

userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({ email })
    if(!user){
        throw new Error('unable to login!')
    }
    const ismatch = await bcrypt.compare(password, user.password)
    if(!ismatch){
        throw new Error('unable to login!')
    }
    return user
}

//hash the plain text before save
userSchema.pre('save', async function (next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()

})

userSchema.pre('remove', async function(next){
    const user = this
    await Tasks.deleteMany({owner: user._id})


    next()
})
const User = mongoose.model('User', userSchema)
module.exports = User