const express = require('express');
const router = express.Router();
const postWeatherInfo  = require('../controllers/PostWeather');

const weather = {}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Invisible Technologies Test Server Running')
});

router.post('/weather', postWeatherInfo )

router.get('/weather', (req, res) => {
    res.send(weather)
});

module.exports = router;
