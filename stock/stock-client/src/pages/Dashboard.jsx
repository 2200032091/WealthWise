import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import StockCard from '../components/StockCard';
import Header from '../components/Header';

const DEFAULT_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN'];

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [searchSymbol, setSearchSymbol] = useState('');
  const [tokenReady, setTokenReady] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn("Dashboard.jsx: Token not found in localStorage at fetch time");
      }
      if (token) {
        setTokenReady(true); // trigger stock fetching when token is ready
      } else {
        console.warn('No token found. Skipping fetch.');
      }
    }, []);

  const fetchStock = async (symbol) => {
    try {
      
      const res = await axiosInstance.get(`/stocks?symbol=${symbol}`);
      return res.data;
    } catch (err) {
      console.error('Error fetching stock:', symbol, err);
      return null;
    }
  };

  const fetchDefaultStocks = async () => {
    const data = await Promise.all(DEFAULT_SYMBOLS.map(fetchStock));
    setStocks(data.filter(Boolean));
  };

  useEffect(() => {
    if (tokenReady) {
      fetchDefaultStocks();
    }
  }, [tokenReady]);

  const handleSearch = async () => {
    if (!searchSymbol) return;
    const data = await fetchStock(searchSymbol);
    if (data) {
      setStocks((prev) => [data, ...prev.filter((s) => s.symbol !== data.symbol)]);
      setSearchSymbol('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        symbol={searchSymbol}
        setSymbol={setSearchSymbol}
        onSearch={handleSearch}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {stocks.map((stock) => (
          <StockCard key={stock.symbol} data={stock} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
