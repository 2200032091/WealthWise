import axiosInstance from './axiosInstance';

export const fetchCryptoData = async () => {
  const res = await axiosInstance.get('/prices');
  return res.data; 
};

export const addCryptoToWatchlist = async (coin) => {
  const res = await axiosInstance.post('/watchlist', {
   coinId: coin.id,
    coinName: coin.name,
    coinSymbol: coin.symbol,
    coinImage: coin.image,
  });
  return res.data;
};
