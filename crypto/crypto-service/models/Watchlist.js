// models/Watchlist.js
const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // user id from client app
  coinId: { type: String, required: true },  // example: "bitcoin"
  coinName: { type: String, required: true }, // example: "Bitcoin"
  coinSymbol: { type: String, required: true }, // example: "BTC"
  coinImage: { type: String }, // optional
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;
