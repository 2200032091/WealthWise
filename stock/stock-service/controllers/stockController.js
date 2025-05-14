const { fetchStockData } = require('../services/stockApiService');

const getStockData = async (req, res) => {
  const userId = req.user.id; // Access from the decoded token

    // Ensure the userId is valid
    if (!userId) {
      return res.status(400).json({ message: 'User not authenticated' });
    }

  const symbol = req.query.symbol;
  if (!symbol) return res.status(400).json({ error: 'Stock symbol is required' });

  try {
    const data = await fetchStockData(symbol);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
};

module.exports = { getStockData };
