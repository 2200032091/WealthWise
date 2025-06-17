import React, { useState } from 'react';
import { addTransaction } from '../api';

const AddTransaction = () => {
  const [formData, setFormData] = useState({
    title: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    category: '',
    type: 'expense',
    note: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.amount || !formData.category) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await addTransaction(formData);
      console.log('Transaction Added:', response.data);
      setFormData({
        title: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        category: '',
        type: 'expense',
        note: '',
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-sky-50 to bg-sky-50 p-6 rounded-xl shadow-md mt-6">
      <center><h2 className="text-xl font-semibold mb-4">Add Transaction</h2></center>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={formData.title}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          onChange={handleChange}
          value={formData.amount}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={formData.date}
          className="w-full border p-2 rounded"
        />
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          value={formData.category}
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="type"
          onChange={handleChange}
          value={formData.type}
          className="w-full border p-2 rounded"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <textarea
          name="note"
          placeholder="Note (Optional)"
          onChange={handleChange}
          value={formData.note}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-sky-600 text-white w-full py-2 rounded hover:bg-sky-700"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
