const StockCard = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-all">
      <h2 className="text-xl font-semibold mb-1">{data.symbol}</h2>
      <p>💵 Price: ${data.price}</p>
      <p>🔓 Open: ${data.open}</p>
      <p>📈 High: ${data.high}</p>
      <p>📉 Low: ${data.low}</p>
      <p>↩️ Prev Close: ${data.previousClose}</p>
      <p className="text-sm text-gray-500 mt-2">
        ⏱ {new Date(data.timestamp).toLocaleString()}
      </p>
    </div>
  );
};

export default StockCard;
