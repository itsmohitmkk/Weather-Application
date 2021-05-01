const request = require('request')

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibW9oaXQxMjMxMjIzNDUiLCJhIjoiY2tsaWNub3d1MG0wbzJvcnJrZzB0cTA3MiJ9.Tqsozgopx0BWOMLI3NT4kg'
    //console.log(geocodeURL)
    request({ url: geocodeURL, json: true }, (error, response) => {
        if(error)
            callback("Unable to connect to network" , undefined)
        else if(response.body.features.length === 0 ){
             callback("Unable to find any related information")
   
        }else{
            const longtitude = response.body.features[0].center[0]
            const latitude = response.body.features[0].center[1]
            const place = response.body.features[0].place_name
            const location = {latitude,longtitude,place}
            callback(undefined , location)
        }
    })
}

module.exports = geocode