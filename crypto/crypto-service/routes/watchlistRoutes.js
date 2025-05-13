const express = require('express');
const { addToWatchlist, getWatchlist, removeFromWatchlist } = require('../controllers/watchlistController');
const authenticate = require('../middleware/auth'); // Authentication middleware

const router = express.Router();

// Add a coin to the watchlist (POST)
router.post('/watchlist', authenticate, addToWatchlist);

// Get the user's watchlist (GET)
router.get('/watchlist', authenticate, getWatchlist);

// Remove a coin from the watchlist (DELETE)
router.delete('/watchlist', authenticate, removeFromWatchlist);

module.exports = router;
