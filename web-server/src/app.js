const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utilities/geocode')
const forcast = require('./utilities/forecast')


const app = express()


//defining paths for express confing

const PublicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebar engine and views location

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// setup static directory to serve

app.use(express.static(PublicDirectoryPath))

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Address must be provided!'
        })
    }
    geocode(req.query.address, (error, {latitiude, longtiude, location} = {})=>{
        if(error){
           return res.send({error})
        }
        forcast(latitiude, longtiude, (error, forcastData)=>{
           if(error){
              return res.send({error})
           }

     
           res.send(
            {forcast: forcastData, 
            location,
            address: req.query.address

            }
            )
           
        })
     
     }
     )

    // res.send({
    //     forcast: 'its snowing',
    //     location: 'london',
    //     address: req.query.address
    // })
})
app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide search term!!'

        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })

})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Created by abel assefa'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Created by: abel assefa'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help ',
        name: 'Created by: abel assefa'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        errormessage: 'Help article not found!!',
        name: 'Created By Abel'
    })
})


app.get('*', (req, res) => {
    res.render('404Page', {
        title: '404',
        errormessage: 'Page not found!1',
        name: 'Created By Abel'
    })
})





app.listen(3000, () => {
    console.log('the server is up')
}
)