const Transaction = require('../models/Transaction');

const addTransaction = async (req, res) => {
  const { type, category, amount, note } = req.body;
  console.log('Request Body:', req.body); // Debugging line to check request body
  console.log('Authenticated User:', req.user); //
  
  if (!req.user) {
    return res.status(400).json({ msg: 'User not authenticated' });
  }

  try {
    const newTransaction = await Transaction.create({
      user: req.user,
      type,
      category,
      amount,
      note
    });
    console.log(newTransaction);
    res.status(201).json(newTransaction);
  } catch (err) {
    console.error('Error adding transaction:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user }).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { addTransaction, getTransactions };
