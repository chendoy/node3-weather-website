const request = require('request')


const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7d238226e4cef0dade0a72b30127f1c4&query=' + encodeURIComponent(long) + ',' + encodeURIComponent(lat) + ''
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find forecast. Try another search', undefined)
        } else {
            const temp = body.current.temperature
            const feelsLike = body.current.feelslike
            const desc = body.current.weather_descriptions[0]
            callback(undefined, {
                temp,
                feelsLike,
                desc
            })
        }
    })
}

module.exports = forecast