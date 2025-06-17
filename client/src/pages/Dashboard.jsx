import { useState, useEffect } from 'react';
import { getTransactions, addTransaction, getUserProfile } from '../api';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StatsCards from '../components/StatsCards';
import SpendingChart from '../components/SpendingChart';
import TransactionList from '../components/TransactionList';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    type: 'expense',
    note: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const txRes = await getTransactions();
        const userRes = await getUserProfile();
        setTransactions(txRes.data);
        setUser(userRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTransactionSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addTransaction({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      setTransactions((prev) => [...prev, data]);
      setIsAddTransactionModalOpen(false);
      setFormData({ title: '', amount: '', category: '', type: 'expense', note: '' });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-sky-50 min-h-screen">
        <Navbar user={user} />
        <div className="p-6">
          <h1 className="text-2xl font-bold">Welcome to your dashboard</h1>

          <div className="p-6 space-y-6">
            <button
              onClick={() => setIsAddTransactionModalOpen(true)}
              className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600"
            >
              Add Transaction
            </button>

            <StatsCards transactions={transactions} />
            <SpendingChart transactions={transactions} />
            <TransactionList transactions={transactions} />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isAddTransactionModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Add New Transaction</h2>
            <form onSubmit={handleAddTransactionSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 mb-2 border rounded-md"
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full p-2 mb-2 border rounded-md"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 mb-2 border rounded-md"
              />
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full p-2 mb-2 border rounded-md"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <input
                type="text"
                name="note"
                placeholder="Note (optional)"
                value={formData.note}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded-md"
              />
              <button
                type="submit"
                className="w-full bg-teal-500 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </form>
            <button
              onClick={() => setIsAddTransactionModalOpen(false)}
              className="mt-4 text-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
