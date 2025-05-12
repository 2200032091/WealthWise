const axios = require('axios');
const API_KEY = process.env.STOCK_API_KEY;

const fetchStockData = async (symbol) => {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

  const res = await axios.get(url);
  const quote = res.data['Global Quote'];

  return {
    symbol: quote['01. symbol'],
    price: parseFloat(quote['05. price']),
    open: parseFloat(quote['02. open']),
    high: parseFloat(quote['03. high']),
    low: parseFloat(quote['04. low']),
    previousClose: parseFloat(quote['08. previous close']),
    timestamp: new Date().toISOString()
  };
};

module.exports = { fetchStockData };
