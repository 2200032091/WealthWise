import axios from 'axios';

const API_URL = 'http://ec2-34-229-215-209.compute-1.amazonaws.com:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Set or remove Authorization token for protected routes
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers['Authorization'];
  }
};

// Register user
export const registerUser = (data) => {
  return axiosInstance.post('/auth/register', data);
};

// Login user
export const loginUser = (data) => {
  return axiosInstance.post('/auth/login', data);
};

// Get user transactions (protected route)
export const getTransactions = () => {
  return axiosInstance.get('/transactions');
};

// Add a new transaction (protected route)
export const addTransaction = (data) => {
  return axiosInstance.post('/transactions', data);
};

// Get user profile (protected route)
export const getUserProfile = () => {
  return axiosInstance.get('/users/profile');
};

export const getInvestments = async () => {
  const response = await axiosInstance.get('/investments');
  return response.data;
};

export const addInvestment = async (data) => {
  await axiosInstance.post('/investments', data);
};