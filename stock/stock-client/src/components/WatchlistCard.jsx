const WatchlistCard = ({ data, onRemove }) => (
  <div className="bg-white p-4 rounded shadow hover:shadow-md">
    <h2 className="text-xl font-semibold">{data.symbol}</h2>
    <p>💰 ${data.price}</p>
    <p>⏱ {new Date(data.timestamp).toLocaleString()}</p>
    <button
      className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
      onClick={onRemove}
    >
      Remove from Watchlist
    </button>
  </div>
);

export default WatchlistCard;
