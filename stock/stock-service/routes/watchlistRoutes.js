const express = require('express');
const router = express.Router();
const Watchlist = require('../models/Watchlist');
const authenticateToken = require('../middleware/auth');

// ➕ Add to watchlist
router.post('/', authenticateToken, async (req, res) => {
  const { symbol } = req.body;
  const userId = req.user.id;
  console.log('🔥 POST /watchlist hit', { symbol, userId });
  try {
    const exists = await Watchlist.findOne({ userId, symbol });
    if (exists) return res.status(400).json({ message: 'Stock already in watchlist' });

    const entry = new Watchlist({ userId, symbol });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    console.error('❌ Error in POST /watchlist:', err);
    res.status(500).json({ error: err.message });
  }
});

// 📥 Get watchlist
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const list = await Watchlist.find({ userId });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🗑️ Remove from watchlist
router.delete('/:symbol', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const symbol = req.params.symbol;

  try {
    await Watchlist.deleteOne({ userId, symbol });
    res.json({ message: 'Removed from watchlist' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
