import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, setAuthToken } from '../api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      const token = response.data.token;
      setAuthToken(token);
      localStorage.setItem('token', token);
      navigate('/dashboard');
      // In main-client (e.g., Login.js or AuthContext after login success)
      document.cookie = `token=${token}; path=/; secure; samesite=strict`;

    } catch (error) {
      console.error("Login failed:", error.response?.data?.msg || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className="w-full border p-2 rounded"
            required
          />
          <button type="submit" className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700 shadow-lg transition duration-300">
            Login
            
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Don't have an account? <a href="/register" className="text-sky-600 underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
