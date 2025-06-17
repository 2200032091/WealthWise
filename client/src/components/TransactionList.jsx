import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api';

const TransactionList = () => {
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

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      <ul className="divide-y divide-sky-200">
        {transactions.map((tx) => (
          <li key={tx._id} className="py-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium capitalize">{tx.type} - {tx.category}</p>
              <p className="text-xs text-gray-500">{tx.note || 'No note added'}</p>
              <p className="text-xs text-gray-400">{new Date(tx.date).toLocaleDateString()}</p>
            </div>
            <div className={`text-sm font-semibold ${tx.type === 'expense' ? 'text-red-500' : 'text-green-600'}`}>
              {tx.type === 'expense' ? '-' : '+'}${tx.amount.toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
