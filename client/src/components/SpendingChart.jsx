import React, { useEffect, useState } from 'react';
import { getTransactions } from '../api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SpendingChart = () => {
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

  // Group expenses by month
  const monthlyData = {};
  transactions.forEach((tx) => {
    if (tx.type === 'expense') {
      const month = new Date(tx.date).toLocaleString('default', { month: 'short' });
      monthlyData[month] = (monthlyData[month] || 0) + tx.amount;
    }
  });

  const chartData = Object.entries(monthlyData).map(([month, spending]) => ({
    month,
    spending,
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Spending Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="spending" stroke="#ef4444" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
