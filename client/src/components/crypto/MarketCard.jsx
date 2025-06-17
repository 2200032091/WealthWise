import React, { useState, useEffect } from 'react';

const MarketCard = ({ coin, addToWatchlist, removeFromWatchlist, watchlist }) => {
  const [isAdded, setIsAdded] = useState(false);

  // Check if coin is in watchlist
  useEffect(() => {
    const isCoinInWatchlist = watchlist.some((item) => item.coinId === coin.id);
    setIsAdded(isCoinInWatchlist);
  }, [coin.id, watchlist]);

  const isUp = coin.price_change_percentage_24h >= 0;

  const handleAddToWatchlist = async () => {
    if (!isAdded) {
      await addToWatchlist(coin); // Add to the watchlist
      setIsAdded(true);
    }
  };

  const handleRemoveFromWatchlist = async () => {
    if (isAdded) {
      await removeFromWatchlist(coin); // Remove from the watchlist
      setIsAdded(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center space-y-2 hover:shadow-xl transition">
      <img src={coin.image} alt={coin.name} className="w-16 h-16" />
      <h2 className="text-xl font-bold">{coin.name}</h2>
      <p className="text-gray-600 uppercase">{coin.symbol}</p>
      <p className="text-2xl font-semibold text-gray-800">
        {coin.current_price !== undefined
          ? `$${coin.current_price.toLocaleString()}`
          : 'Price N/A'}
      </p>
      <p className={`text-sm font-medium ${isUp ? 'text-green-500' : 'text-red-500'}`}>
        {coin.price_change_percentage_24h !== undefined
          ? `${isUp ? '▲' : '▼'} ${coin.price_change_percentage_24h.toFixed(2)}%`
          : 'Change N/A'}
      </p>

      {/* Add or Remove from Watchlist Button */}
      {isAdded ? (
        <button
          onClick={handleRemoveFromWatchlist}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Remove from Watchlist
        </button>
      ) : (
        <button
          onClick={handleAddToWatchlist}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add to Watchlist
        </button>
      )}
    </div>
  );
};

export default MarketCard;
