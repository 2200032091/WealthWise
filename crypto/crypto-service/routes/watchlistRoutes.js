// routes/watchlistRoutes.js
const express = require('express');
const { addToWatchlist, getWatchlist, removeFromWatchlist } = require('../controllers/watchlistController');

const router = express.Router();

// Add a coin to watchlist
router.post('/add', addToWatchlist);

// Get user's watchlist
router.get('/:userId', getWatchlist);

// Remove a coin from watchlist
router.delete('/remove', removeFromWatchlist);

module.exports = router;
