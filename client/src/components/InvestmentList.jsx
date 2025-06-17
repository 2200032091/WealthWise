
import React, { useEffect, useState } from 'react';
import { fetchCryptoData } from '../api/crypto/crypto';
import { getStockPrice } from '../api/stock/stock';

const InvestmentList = ({ investments }) => {
     const [prices, setPrices] = useState({});

    useEffect(() => {
    const fetchPrices = async () => {
      const cryptoSymbols = investments.filter(i => i.type === 'crypto').map(i => i.symbol.toLowerCase());
      const stockSymbols = investments.filter(i => i.type === 'stock').map(i => i.symbol.toUpperCase());

      const newPrices = {};

      // Fetch crypto prices
      if (cryptoSymbols.length) {
        const cryptoData = await fetchCryptoData(); // Should return full list like before
        cryptoSymbols.forEach(sym => {
          const coin = cryptoData.find(c => c.symbol === sym);
          if (coin) newPrices[sym] = coin.current_price;
        });
      }

      // Fetch stock prices individually
      for (let sym of stockSymbols) {
        try {
          const data = await getStockPrice(sym); // endpoint returns data.price
          newPrices[sym.toLowerCase()] = data.price;
          console.log(data.price);
        } catch (err) {
          console.error('Stock price error for', sym);
        }
      }

      setPrices(newPrices);
    };

    fetchPrices();
  }, [investments]);

  if (investments.length === 0) {
    return <p className="text-center text-gray-500">No investments yet.</p>;
  }

  const getProfit = (inv) => {
    const symbolKey = inv.symbol.toLowerCase(); // works for both
    const current = prices[symbolKey];
    if (!current) return '...';
    const profit = (current - inv.buyPrice) * inv.quantity;
    return profit.toFixed(2);
  };


  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Symbol</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Buy Price</th>
            <th className="px-4 py-2">Buy Date</th>
            <th className="px-4 py-2">Current Price</th>
            <th className="px-4 py-2">Profit / Loss</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((inv) => (
            <tr key={inv._id} className="border-t">
              <td className="px-4 py-2 capitalize">{inv.type}</td>
              <td className="px-4 py-2">{inv.symbol}</td>
              <td className="px-4 py-2">{inv.quantity}</td>
              <td className="px-4 py-2">${inv.buyPrice}</td>
              <td className="px-4 py-2">{new Date(inv.buyDate).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                {prices[inv.symbol.toLowerCase()] ? `$${prices[inv.symbol.toLowerCase()].toFixed(2)}` : '...'}
              </td>
              <td className={`px-4 py-2 font-semibold ${getProfit(inv) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${getProfit(inv)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvestmentList;
