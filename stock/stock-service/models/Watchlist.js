const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Watchlist', watchlistSchema);
