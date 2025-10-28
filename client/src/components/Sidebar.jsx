// src/components/Sidebar.jsx
import { FaPlusCircle, FaWallet, FaUser, FaChartLine, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen w-60 bg-sky-900 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-10">WealthWise</h1>
      <nav className="flex flex-col gap-6">
        <Link to="/dashboard" className="flex items-center gap-3 hover:text-sky-400 transition-colors duration-200">
          <FaChartLine /> Dashboard
        </Link>
        <Link to="/wallet" className="flex items-center gap-3 hover:text-sky-400 transition-colors duration-200">
          <FaWallet /> Wallet
        </Link>
        <Link to="/profile" className="flex items-center gap-3 hover:text-sky-400 transition-colors duration-200">
          <FaUser /> Profile
        </Link>
        <Link to="/" className="flex items-center gap-3 mt-auto hover:text-red-400">
          <FaSignOutAlt /> Logout
        </Link>
        <Link to="/add" className="flex items-center gap-3 hover:text-sky-400 transition-colors duration-200 mt-6">
          <FaPlusCircle /> Add Transaction
        </Link>
        <Link to="/crypto" className="flex items-center gap-3 hover:text-sky-400 transition-colors duration-200">
          <FaChartLine /> Crypto Dashboard
        </Link>
        <Link to="/stocks" className="flex items-center gap-3 hover:text-sky-400 transition-colors duration-200">
          <FaChartLine /> Stock Dashboard 
        </Link>
        <Link to="/market" className="flex items-center gap-3 hover:text-sky-400 transition-colors duration-200">
          <FaChartLine /> Market
        </Link>
        <Link to="/investments" className="flex items-center gap-3 hover:text-sky-400 transition-colors duration-200">
          <FaChartLine /> Investments
        </Link>
        <Link to="/projection" className="flex items-center gap-3 hover:text-sky-400 transition-colors duration-200">
          <FaChartLine /> Compound Growth Projection
        </Link>
        

      </nav>
    </div>
  );
};

export default Sidebar;
