// controllers/watchlistController.js
const Watchlist = require('../models/Watchlist');

// Add a coin to watchlist
const addToWatchlist = async (req, res) => {
  try {
    const { userId, coinId, coinName, coinSymbol, coinImage } = req.body;

    const newEntry = new Watchlist({
      userId,
      coinId,
      coinName,
      coinSymbol,
      coinImage,
    });

    await newEntry.save();
    res.status(201).json({ message: 'Coin added to watchlist' });
  } catch (error) {
    console.error('Error adding to watchlist:', error.message);
    res.status(500).json({ message: 'Failed to add to watchlist' });
  }
};

// Get watchlist for a user
const getWatchlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const watchlist = await Watchlist.find({ userId });
    res.status(200).json(watchlist);
  } catch (error) {
    console.error('Error fetching watchlist:', error.message);
    res.status(500).json({ message: 'Failed to fetch watchlist' });
  }
};

// Remove a coin from watchlist
const removeFromWatchlist = async (req, res) => {
  try {
    const { userId, coinId } = req.body;

    await Watchlist.findOneAndDelete({ userId, coinId });

    res.status(200).json({ message: 'Coin removed from watchlist' });
  } catch (error) {
    console.error('Error removing from watchlist:', error.message);
    res.status(500).json({ message: 'Failed to remove from watchlist' });
  }
};

module.exports = { addToWatchlist, getWatchlist, removeFromWatchlist };
