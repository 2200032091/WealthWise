import { useEffect, useState } from 'react';
import { getWatchlist, removeFromWatchlist } from '../api/watchlist';
import axiosInstance from '../api/axiosInstance';
import WatchlistCard from '../components/WatchlistCard';

const Watchlist = () => {
  const [symbols, setSymbols] = useState([]);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchWatchlistData = async () => {
      try {
        const watchlistRes = await getWatchlist();
        const symbolList = watchlistRes.map(w => w.symbol);
        setSymbols(symbolList);

        const dataList = await Promise.all(
          symbolList.map(sym => axiosInstance.get(`/stocks?symbol=${sym}`))
        );
        setStockData(dataList.map(res => res.data));
      } catch (err) {
        console.error('Error fetching watchlist data:', err);
      }
    };

    fetchWatchlistData();
  }, []);

  const handleRemove = async (symbol) => {
    await removeFromWatchlist(symbol);
    setSymbols(prev => prev.filter(s => s !== symbol));
    setStockData(prev => prev.filter(stock => stock.symbol !== symbol));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📋 My Watchlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {stockData.map(stock => (
          <WatchlistCard 
            key={stock.symbol} 
            data={stock} 
            onRemove={() => handleRemove(stock.symbol)} 
          />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
