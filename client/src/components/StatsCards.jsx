import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api';

const StatsCards = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions();
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const totalIncome = transactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Total Income</h3>
        <p className="text-xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
      </div>
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Total Spending</h3>
        <p className="text-xl font-bold text-red-500">${totalExpense.toFixed(2)}</p>
      </div>
      <div className="bg-white shadow-md p-4 rounded-lg">
        <h3 className="text-lg font-semibold">Total Transactions</h3>
        <p className="text-xl font-bold">{transactions.length}</p>
      </div>
    </div>
  );
};

export default StatsCards;
