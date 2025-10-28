
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.wealthwise.gh-18.com/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log("Intertor - token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
