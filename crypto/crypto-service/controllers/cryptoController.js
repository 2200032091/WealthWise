const axios = require('axios');

const getCryptoPrices = async (req, res) => {
  try {
    // Fetch data from CoinGecko API (or any other crypto API you prefer)
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
  order: 'market_cap_desc',
  per_page: 100,
  page: 1,
      }
      
    });

    // Send the data back to the client
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching crypto prices:', error.message);
    res.status(500).json({ msg: 'Failed to fetch crypto prices' });
  }
};

module.exports = { getCryptoPrices };
