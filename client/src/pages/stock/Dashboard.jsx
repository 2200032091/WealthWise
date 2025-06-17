import { useEffect, useState } from 'react';
import axiosInstance from '../../api/stock/axiosInstance';
import StockCard from '../../components/stock/StockCard';
import Header from '../../components/stock/Header';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../../api/stock/watchlist';

const DEFAULT_SYMBOLS = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN'];

const StockDashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [searchSymbol, setSearchSymbol] = useState('');
  const [tokenReady, setTokenReady] = useState(false);

  const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (token) {
    localStorage.setItem('token', token);
    console.log('✅ Token set from URL:', token);
    setTokenReady(true); // ✅ trigger fetch
  } else {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      console.log('✅ Token already in localStorage:', storedToken);
      setTokenReady(true); // ✅ still allow fetch
    } else {
      console.warn('⚠️ No token found, cannot fetch');
    }
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
  try {
    const res = await axiosInstance.get('/stocks'); // no symbol → get all
    setStocks(res.data);
  } catch (err) {
    console.error('Error fetching all stocks:', err);
  }
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
 
  // Handler to add stock to watchlist
  const handleAddToWatchlist = async (symbol) => {
    try {
      await addToWatchlist(symbol);
      setWatchlist((prev) => [...prev, symbol]);
    } catch (err) {
      console.error('Error adding to watchlist:', err);
    }
  };

  // Handler to remove stock from watchlist
  const handleRemoveFromWatchlist = async (symbol) => {
    try {
      await removeFromWatchlist(symbol);
      setWatchlist((prev) => prev.filter(s => s !== symbol));
    } catch (err) {
      console.error('Error removing from watchlist:', err);
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
          <StockCard 
            key={stock.symbol} 
            data={stock} 
            isInWatchlist={watchlist.includes(stock.symbol)}
            onAdd={() => handleAddToWatchlist(stock.symbol)}
            onRemove={() => handleRemoveFromWatchlist(stock.symbol)}
          />
        ))}
      </div>
    </div>
  );
};

export default StockDashboard;
