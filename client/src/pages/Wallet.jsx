import React, { useEffect, useState } from 'react';
import { getTransactions, getUserProfile } from '../api';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Wallet = () => {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const [txRes, userRes] = await Promise.all([
          getTransactions(),
          getUserProfile(),
        ]);
        setTransactions(txRes.data);
        setUser(userRes.data);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    };

    fetchWalletData();
  }, []);

  const totalBalance = transactions.reduce((acc, tx) => {
    return tx.type === 'income' ? acc + tx.amount : acc - tx.amount;
  }, 0);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 min-h-screen">
        <Navbar user={user} />
        <div className="p-6">
          <h1 className="text-2xl font-bold">Your Wallet </h1>
          <div className="mt-6">
            <h3 className="text-xl font-medium">Total Balance</h3>
            <p className="text-4xl font-bold text-teal-500">
              ${totalBalance.toFixed(2)}
            </p>

            <div className="mt-6 space-y-4">
              <h3 className="text-xl font-medium">Transaction History</h3>
              <div className="bg-white shadow-md rounded-md p-4 space-y-2 max-h-[400px] overflow-y-auto">
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <div
                      key={tx._id}
                      className="border-b pb-2 flex justify-between text-sm"
                    >
                      <div>
                        <p className="font-medium">{tx.title}</p>
                        <p className="text-gray-500">{tx.category} • {new Date(tx.date).toLocaleDateString()}</p>
                        <p className="text-gray-400 text-xs">{tx.note}</p>
                      </div>
                      <p className={`font-semibold ${tx.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                        {tx.type === 'income' ? '+' : '-'}${tx.amount}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No transactions yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
