const express = require('express');
const { getCryptoPrices } = require('../controllers/cryptoController');

const router = express.Router();

// Define the route for getting live crypto prices
router.get('/prices', getCryptoPrices);

module.exports = router;
