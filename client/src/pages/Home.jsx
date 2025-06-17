import React from "react";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex flex-col items-center justify-center text-slate-800 px-6 relative overflow-hidden">

      {/* Decorative background element */}
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-30 z-0" />

      {/* Main content */}
      <div className="z-10 flex flex-col items-center text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-sky-700 tracking-tight drop-shadow-md">
           WealthWise
        </h1>
        <p className="text-lg md:text-xl mb-8 text-slate-600 font-medium leading-relaxed">
          Track your finances, visualize expenses, monitor investments and build your wealth — all in one place.
        </p>

        <div className="flex gap-6">
          <button
            onClick={() => navigate('/login')}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition duration-300"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="border-2 border-sky-600 text-sky-700 hover:bg-sky-50 px-6 py-3 rounded-lg text-lg font-semibold transition duration-300"
          >
            Register
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-sm text-slate-500 z-10 text-center">
        <p>© {new Date().getFullYear()} Harika Gorikapudi. All rights reserved.</p>
        <p className="mt-1">Built with passion 💙 for personal finance geeks and future investors.</p>
      </footer>
    </div>
  );
};

export default Home;
