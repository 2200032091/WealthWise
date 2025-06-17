import axiosInstance from './axiosInstance';

import { setAuthToken } from '../../api';

const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

export const fetchAllStocks = async () => {
  const res = await axiosInstance.get('/stocks');
  return res.data;
};

export const addToWatchlist = async (symbol) => {
  const res = await axiosInstance.post('/stocks/watchlist', { symbol });
  return res.data;
};

export const removeFromWatchlist = async (symbol) => {
  const res = await axiosInstance.delete(`/stocks/watchlist/${symbol}`);
  return res.data;
};

export const getWatchlist = async () => {
  const res = await axiosInstance.get('/stocks/watchlist');
  return res.data; 
};

export const getStockPrice = async (symbol) => {
  const res = await axiosInstance.get(`/stocks/price/${symbol}`);
  console.log("💡 Stock price API response:", res.data);
  return res.data; 
}
