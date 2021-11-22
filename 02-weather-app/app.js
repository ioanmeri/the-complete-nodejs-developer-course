const request = require('request')

const url = 'http://api.weatherstack.com/current?access_key=91998dce301f190e1991aab0ce7e8599&query=37.8267,-122.4233'

request({ url: url }, (error, response) => {
  const data = JSON.parse(response.body)
  console.log(data.current)
})

