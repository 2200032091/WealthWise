// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5006/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log("Interceptor - token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
