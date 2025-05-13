const Watchlist = require('../models/Watchlist');

// Add a coin to watchlist
const addToWatchlist = async (req, res) => {
  try {
    const { coinId, coinName, coinSymbol, coinImage } = req.body;
    const userId = req.userId; // This comes from the middleware

    // Ensure the userId is valid
    if (!userId) {
      return res.status(400).json({ message: 'User not authenticated' });
    }

    // Check if coin is already in the user's watchlist
    const existingCoin = await Watchlist.findOne({ userId, coinId });
    if (existingCoin) {
      return res.status(400).json({ message: 'Coin is already in the watchlist' });
    }

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

// Get watchlist for the logged-in user
const getWatchlist = async (req, res) => {
  try {
    const userId = req.userId; // From middleware

    // Ensure the userId is valid
    if (!userId) {
      return res.status(400).json({ message: 'User not authenticated' });
    }

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
    const userId = req.userId; // From middleware
    const { coinId } = req.body;

    // Ensure the userId is valid
    if (!userId) {
      return res.status(400).json({ message: 'User not authenticated' });
    }

    const removedCoin = await Watchlist.findOneAndDelete({ userId, coinId });

    if (!removedCoin) {
      return res.status(404).json({ message: 'Coin not found in watchlist' });
    }

    res.status(200).json({ message: 'Coin removed from watchlist' });
  } catch (error) {
    console.error('Error removing from watchlist:', error.message);
    res.status(500).json({ message: 'Failed to remove from watchlist' });
  }
};

module.exports = { addToWatchlist, getWatchlist, removeFromWatchlist };
