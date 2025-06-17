import React from 'react';

const Sidebar = ({ view, setView }) => {
  return (
    <div className="bg-white shadow-md h-full w-48 flex flex-col py-8 space-y-4">
      <button
        className={`px-4 py-2 text-left font-semibold ${view === 'market' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
        onClick={() => setView('market')}
      >
        🪙 Crypto Market
      </button>
      <button
        className={`px-4 py-2 text-left font-semibold ${view === 'watchlist' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
        onClick={() => setView('watchlist')}
      >
        ⭐ Watchlist
      </button>
    </div>
  );
};

export default Sidebar;
