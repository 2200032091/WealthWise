import axiosInstance from './axiosInstance';

export async function fetchWishlist() {
  const response = await axiosInstance.get('/watchlist');
  return response.data;
}
