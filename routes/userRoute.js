const express = require('express');
const userService = require('../services/userService');

const router = express.Router();

router.get('/', async (req, res) => {
  userService.csvTojson().then(function (data) {
    res.json(data);
  }).catch(function (err) {
    res.status(500).send('Server Error');
  })
});

router.get('/calculate/age/distribution', async (req, res) => {
  userService.calAgeDistribution().then(function (data) {
    res.json(data);
  }).catch(function (error) {
    res.status(500).send('Server Error');
  })
});

module.exports = router;