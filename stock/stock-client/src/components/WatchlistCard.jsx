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

// // const WatchlistCard = ({ data, onRemove }) => (
//   <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col gap-2 border border-slate-100">
//     <div className="flex justify-between items-center">
//       <h2 className="text-2xl font-bold text-sky-800 uppercase">{data.symbol}</h2>
//       <p className="text-lg font-semibold text-green-600">💰 ${data.price}</p>
//     </div>

//     <p className="text-sm text-slate-500">⏱ {new Date(data.timestamp).toLocaleString()}</p>

//     <button
//       onClick={onRemove}
//       className="mt-4 self-start px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium transition-colors duration-200"
//     >
//       Remove from Watchlist
//     </button>
//   </div>
// );


export default WatchlistCard;
