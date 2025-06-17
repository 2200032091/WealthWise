import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';  // Adjust the path based on your folder structure

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const { data } = await registerUser(formData);
      console.log('Registration successful:', data);
      navigate('/login');  // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration failed:', error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-sky-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name" className="w-full p-2 border rounded" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded" onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full p-2 border rounded" onChange={handleChange} required />
          <button type="submit" className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700 shadow-lg transition duration-300">Register</button>
        </form>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account? <a href="/login" className="text-sky-600 underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
