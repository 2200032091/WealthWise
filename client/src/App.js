// src/App.jsx
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import AddTransaction from './components/AddTransaction';
import { setAuthToken } from './api';
import CryptoWrapper from './pages/CryptoWrapper';
import StockWrapper from './pages/StockWrapper';
import Home from './pages/Home';
import CryptoDashboard from './pages/crypto/CryptoDashboard';
import StockDashboard from './pages/stock/Dashboard';
import Watchlist from './pages/stock/WatchList';
import Markets from './pages/Markets';
import InvestmentGrowth from './pages/InvestmentGrowth';
import Projection from './pages/Projection';
function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setAuthToken(token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add" element={<AddTransaction />} />
        <Route path="/crypto-dashboard" element={<CryptoWrapper />} />
        <Route path="/stock-dashboard" element={<StockWrapper/>} />
        <Route path="/crypto" element={<CryptoDashboard/>} />
        <Route path="/stocks" element={<StockDashboard/>} />
         <Route path="/stocks/watchlist" element={<Watchlist />} />
        <Route path="/market" element={<Markets/>} />
        <Route path="/investments" element={<InvestmentGrowth/>} />
        <Route path="/projection" element={<Projection/>}/>
      </Routes>
    </Router>
  );
}
export default App;
