import React, { useState } from 'react';

const InvestmentForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    type: 'crypto',
    symbol: '',
    quantity: '',
    buyPrice: '',
    buyDate: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAdd(form);
    setForm({ type: 'crypto', symbol: '', quantity: '', buyPrice: '', buyDate: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
      <select name="type" value={form.type} onChange={handleChange} className="w-full p-2 border rounded">
        <option value="crypto">Crypto</option>
        <option value="stock">Stock</option>
      </select>

      <input name="symbol" value={form.symbol} onChange={handleChange} placeholder="Symbol (e.g., BTC, AAPL)" className="w-full p-2 border rounded" required />
      <input name="quantity" value={form.quantity} onChange={handleChange} type="number" placeholder="Quantity" className="w-full p-2 border rounded" required />
      <input name="buyPrice" value={form.buyPrice} onChange={handleChange} type="number" placeholder="Buy Price" className="w-full p-2 border rounded" required />
      <input name="buyDate" value={form.buyDate} onChange={handleChange} type="date" className="w-full p-2 border rounded" required />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Investment
      </button>
    </form>
  );
};

export default InvestmentForm;
