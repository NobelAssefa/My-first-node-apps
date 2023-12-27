const fs = require('fs')
const person = {
    name:'abel',
    planet: 'earth',
    age: '24'
}

const JSONperson = JSON.stringify(person)
const personJsondata = fs.writeFileSync('1-json.json', JSONperson)
const readperson = fs.readFileSync('1-json.json')
const realdata = readperson.toString()
const parsedData = JSON.parse(realdata)
parsedData.name ='estif'
parsedData.age = '40'

const newPerson = JSON.stringify(parsedData)
const updatedData = fs.writeFileSync('1-json.json', newPerson)
const bufferData = fs.readFileSync('1-json.json')
