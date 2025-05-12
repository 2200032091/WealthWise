const express = require('express');
const { addToWatchlist, getWatchlist, removeFromWatchlist } = require('../controllers/watchlistController');
const authenticate = require('../middleware/auth'); // you create this

const router = express.Router();

router.post('/watchlist', authenticate, addToWatchlist);
router.get('/watchlist', authenticate, getWatchlist);
router.delete('/watchlist', authenticate, removeFromWatchlist);

module.exports = router;
