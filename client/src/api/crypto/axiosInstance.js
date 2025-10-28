import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://ec2-34-229-215-209.compute-1.amazonaws.com:5006/api/crypto',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
