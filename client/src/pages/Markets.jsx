import { useState, useEffect } from 'react';
import CryptoCard from '../components/crypto/CryptoCard';
import StockCard from '../components/stock/StockCard';
import { motion } from 'framer-motion';
import { fetchCryptoData, addCryptoToWatchlist } from '../api/crypto/crypto'; 
import { fetchAllStocks, addToWatchlist, removeFromWatchlist} from '../api/stock/stock'; 

const Markets = () => {
  const [activeTab, setActiveTab] = useState('crypto');
  const [cryptoData, setCryptoData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
  if (activeTab === 'crypto') {
    fetchCryptoData().then(setCryptoData);
  } else {
    fetchAllStocks().then(setStockData);
    
  }
}, [activeTab]);

  const handleCryptoWatchlist = async (coin) => {
    await addCryptoToWatchlist(coin);
  };

  const handleStockAdd = async (symbol) => {
    await addToWatchlist(symbol);
    setWatchlist((prev) => [...prev, symbol]);
  };

  const handleStockRemove = async (symbol) => {
    await removeFromWatchlist(symbol);
    setWatchlist((prev) => prev.filter((s) => s !== symbol));
  };

  const filteredCrypto = cryptoData.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredStocks = stockData.filter((s) =>
    s.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">🌐 Markets Dashboard</h1>

     
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-6 py-2 rounded-full font-semibold transition ${
            activeTab === 'crypto'
              ? 'bg-purple-600 text-white shadow'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('crypto')}
        >
          🔗 Crypto
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition ${
            activeTab === 'stocks'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('stocks')}
        >
          📈 Stocks
        </button>
      </div>

     
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${activeTab === 'crypto' ? 'crypto' : 'stock'}...`}
          className="w-full max-w-md px-4 py-2 border rounded-lg shadow"
        />
      </div>

      
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {activeTab === 'crypto' &&
          filteredCrypto.map((coin) => (
            <CryptoCard key={coin.id} coin={coin} addToWatchlist={handleCryptoWatchlist} />
          ))}
        {activeTab === 'stocks' &&
          filteredStocks.map((stock) => (
            <StockCard
              key={stock.symbol}
              data={stock}
              isInWatchlist={watchlist.includes(stock.symbol)}
              onAdd={() => handleStockAdd(stock.symbol)}
              onRemove={() => handleStockRemove(stock.symbol)}
            />
          ))}
      </motion.div>
    </div>
  );
};

export default Markets;
