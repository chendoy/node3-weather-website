const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')


const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Chen Doytshman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Chen Doytshman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'Help is on the way',
        title: 'Help',
        name: 'Chen Doytshman'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(address, (error, geoResponse) => {
        if (error) {
            return res.send({
                error: 'An error occurred'
            })
        }
        forecast(geoResponse.latitude, geoResponse.longtitude, (error, response) => {
            if (error) {
                return res.send({
                    error: 'An error occurred'
                })
            }
            res.send({
                temp: response.temp,
                feelslike: response.feelsLike,
                location: geoResponse.location,
                address,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'Help artiacle not found',
        name: 'Chen Doytshman'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'Page not found',
        name: 'Chen Doytshman'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + ".")
})