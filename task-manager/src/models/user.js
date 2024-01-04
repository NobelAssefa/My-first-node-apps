const mongoose = require('mongoose')
const validator = require("validator")


const User = mongoose.model('User', {
    name:{
        type: String,
        trim: true,
        lowercase: true
    },
    email: {
        type:String,
        required: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid!!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength:7,
        tirm:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('The password field can not contain the word password')
            }

        }
    },
    age: {
        type: Number,
        default:0,
        validate(value){
            if(value < 0){
               throw new Error("Age can't be a negative number")
            }

        }
    }
})
 module.exports = User