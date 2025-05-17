const axios = require('axios');
const NodeCache = require('node-cache');
const API_KEY = process.env.STOCK_API_KEY;

const cache = new NodeCache({ stdTTL: 60 }); // ⏱️ cache for 60 seconds

const getStockData = async (symbol) => {
  if (!symbol) {
    throw new Error("Symbol is required for getStockData");
  }

  // 🔍 Check cache first
  const cached = cache.get(symbol);
  if (cached) {
    console.log(`✅ Cache hit for ${symbol}`);
    return cached;
  }

  console.log(`📡 Fetching from Alpha Vantage for ${symbol}`);
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

  const res = await axios.get(url);
  console.log('Alpha Vantage raw data:', res.data);
  const quote = res.data['Global Quote'];

  if (!quote || !quote['01. symbol']) {
    if (res.data.Note) {
    throw new Error(`Alpha Vantage rate limit hit: ${res.data.Note}`);
  }
    throw new Error(`Invalid data returned for symbol: ${symbol}`);
  }

  const data = {
    symbol: quote['01. symbol'],
    price: parseFloat(quote['05. price']),
    open: parseFloat(quote['02. open']),
    high: parseFloat(quote['03. high']),
    low: parseFloat(quote['04. low']),
    previousClose: parseFloat(quote['08. previous close']),
    timestamp: new Date().toISOString()
  };

  // 💾 Save to cache
  cache.set(symbol, data);

  return data;
};

module.exports = { getStockData };
