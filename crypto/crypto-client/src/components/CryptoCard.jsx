import React, { useState } from 'react';

const CryptoCard = ({ coin, addToWatchlist }) => {
  const isUp = coin.price_change_percentage_24h
  ? coin.price_change_percentage_24h >= 0
  : true;
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToWatchlist = async () => {
    if (isAdded) return;
    // Call function to add to watchlist in parent component (Dashboard)
    await addToWatchlist(coin);
    setIsAdded(true); // Change state to prevent multiple clicks
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

      {/* Add to Watchlist Button */}
      <button
        onClick={handleAddToWatchlist}
        className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg ${isAdded ? 'opacity-50' : 'hover:bg-blue-600'}`}
        disabled={isAdded}
      >
        {isAdded ? 'Added to Watchlist' : 'Add to Watchlist'}
      </button>
    </div>
  );
};

export default CryptoCard;
