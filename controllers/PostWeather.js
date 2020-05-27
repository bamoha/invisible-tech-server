const axios = require('axios')
const config = require('config')
const { randomBytes } = require('crypto')

let weather = {}

const findWeather = async (location) => {
    try {
        const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=3ffd34d6ff9ce5682c0408585722abf2`)
        return res.data
    } catch (err) {
        return err.response.status
    }
}

 const postWeatherInfo = async (req, res) => {
    for (let location of req.body) {
        const data = await findWeather(location)
        if (typeof data === 'number') {
            weather[location] = {
                id: randomBytes(4).toString('hex'),
                message: `Sorry, There is no weather data 
                    on this location.`
            }
        } else {
            const { main } = data.weather[0] 
            const { temp } = data.main
            const { speed } = data.wind
            const { country } = data.sys
            weather[location] = {
                id: randomBytes(4).toString('hex'),
                currentTemperature: temp,
                windSpeed: speed,
                country,
                description: main,
                timezone: data.timezone
            }
        } 
    }
    res.send(weather)
    weather = {}
};

module.exports = postWeatherInfo;