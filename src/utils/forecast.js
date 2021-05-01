const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ef14a236db56ebba6c1939d618189d0a&QUERY='+ encodeURIComponent(latitude) +',' + encodeURIComponent(longtitude) + '+&unit=f'

    request({url: url, json: true }, (error, response) => {
        if (error)
           callback( "Unable to connect to network" , undefined)
        else if (response.body.error) {
            callback(response.body.error.info , undefined)
        } else {
            callback( undefined, response.body.location.region + "  : " + "Current Tempreature of " + response.body.location.region + " is " + response.body.current.temperature + ".There is a " + response.body.current.precip + " % of rain");
        }
    })
}

module.exports = forecast