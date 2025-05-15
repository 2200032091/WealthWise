const express = require('express');
const router = express.Router();
const { getStockData } = require('../controllers/stockController');

const ALL_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN', 'META', 'NVDA'];

router.get('/', async (req, res) => {
  const { symbol } = req.query;

  try {
    if (symbol) {
      const data = await getStockData(symbol);
      return res.json(data);
    }

    // 🚀 No symbol → return all default stocks
    const results = await Promise.all(
      ALL_SYMBOLS.map((sym) => getStockData(sym))
    );

    res.json(results);
  } catch (err) {
    console.error('Error fetching stock data:', err);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

module.exports = router;


