const axios = require('axios');

const getCryptoPrices = async () => {
  const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd';

  const response = await axios.get(url);
  return response.data;
};

module.exports = { getCryptoPrices };
