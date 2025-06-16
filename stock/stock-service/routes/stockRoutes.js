const express = require('express');
const router = express.Router();
const { getStockData } = require('../controllers/stockController');
const authenticateToken =require( '../middleware/auth');

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

router.get('/price/:symbol',authenticateToken, async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  try {
    console.log('route hit');
    const data = await getStockData(symbol);
    console.log(data.price);
    res.status(200).json({ price: data.price });
  } catch (err) {
    console.error('Error fetching stock price:', err.message);
    res.status(500).json({ message: 'Error fetching price' });
  }
});

router.get('/test', (req, res) => {
  res.send('✅ Stock service is alive');
});

module.exports = router;


