import React, { useEffect, useState } from 'react';
import CryptoCard from '../components/CryptoCard';
import Sidebar from '../components/Sidebar';
import axiosInstance from '../api/axiosInstance';


const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [view, setView] = useState('market');
  const [watchlist, setWatchlist] = useState([]);
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  if (token) {
    localStorage.setItem('token', token);
    // Optional: force reload or redirect to clean URL
    window.location.href = window.location.pathname; // removes token from URL
  }
}, []);


  const fetchData = async () => {
    try {
      const res = await axiosInstance.get('/prices');
      setCoins(res.data);
    } catch (err) {
      console.error('Error fetching market data:', err);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const res = await axiosInstance.get('/watchlist');
      setWatchlist(res.data);
    } catch (err) {
      console.error('Error fetching watchlist:', err);
    }
  };

  useEffect(() => {
    fetchData();
    

    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
  if (view === 'watchlist') {
    fetchWatchlist();
  }
}, [view]);

  const addToWatchlist = async (coin) => {
    try {
      const res = await axiosInstance.post('/watchlist', {
        coinId: coin.id,
        coinName: coin.name,
        coinSymbol: coin.symbol,
        coinImage: coin.image,
      });

      setWatchlist((prev) => [...prev, res.data]);
    } catch (err) {
      console.error('Error adding to watchlist:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white to-gray-100">
      <Sidebar view={view} setView={setView} />

      <div className="flex-1 py-10 px-6">
        <h1 className="text-4xl font-bold text-center mb-8">
          {view === 'market' ? 'Crypto Market' : '⭐ My Watchlist'}
        </h1>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {view === 'market'
            ? coins.map((coin) => (
                <CryptoCard key={coin.id} coin={coin} addToWatchlist={addToWatchlist} />
              ))
            : watchlist.map((coin) => (
                <CryptoCard key={coin.coinId} coin={coin} addToWatchlist={addToWatchlist} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
