
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://ec2-34-229-215-209.compute-1.amazonaws.com:5006/api',
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
