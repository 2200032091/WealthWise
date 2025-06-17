
import React, { useEffect, useState } from 'react';
import InvestmentForm from '../components/InvestmentForm';
import InvestmentList from '../components/InvestmentList';
import { getInvestments, addInvestment } from '../api';

const InvestmentGrowth = () => {
  const [investments, setInvestments] = useState([]);

  const fetchInvestments = async () => {
    try {
      const data = await getInvestments();
      setInvestments(data);
    } catch (err) {
      console.error('Failed to fetch investments:', err.message);
    }
  };

  const handleAddInvestment = async (data) => {
    try {
      await addInvestment(data);
      fetchInvestments();
    } catch (err) {
      console.error('Error adding investment:', err.message);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">📈 Investment Growth Simulator</h1>
      <InvestmentForm onAdd={handleAddInvestment} />
      <InvestmentList investments={investments} />
    </div>
  );
};

export default InvestmentGrowth;
