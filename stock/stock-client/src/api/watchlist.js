import axiosInstance from './axiosInstance';

export const getWatchlist = async () => {
  const res = await axiosInstance.get('/stocks/watchlist');
  return res.data; // should be array of symbols or stock data
};

export const addToWatchlist = async (symbol) => {
  const res = await axiosInstance.post('/stocks/watchlist', { symbol });
  return res.data;
};

export const removeFromWatchlist = async (symbol) => {
  const res = await axiosInstance.delete(`/stocks/watchlist/${symbol}`);
  return res.data;
};
