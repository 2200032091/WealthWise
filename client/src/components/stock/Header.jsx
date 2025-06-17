import { useNavigate } from 'react-router-dom';

const Header = ({ symbol, setSymbol, onSearch }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1 className="text-2xl font-bold text-gray-800"> Stock Dashboard</h1>

      <div className="flex gap-2 items-center">
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Search stock (e.g. NFLX)"
          className="p-2 border rounded"
        />
        <button
          onClick={onSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-sky-700"
        >
          Search
        </button>
        <button
          onClick={() => navigate('/stocks/watchlist')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
           Watchlist
        </button>
      </div>
    </div>
  );
};

export default Header;
