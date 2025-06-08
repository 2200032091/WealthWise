const Investment = require('../models/Investment');

// Add new investment
const addInvestment = async (req, res) => {
  try {
    const { type, symbol, quantity, buyPrice, buyDate } = req.body;
    const userId = req.user;

    if (!userId) {
      return res.status(400).json({ message: 'User not authenticated' });
    }

    const newInvestment = new Investment({
      userId,
      type,
      symbol,
      quantity,
      buyPrice,
      buyDate
    });

    await newInvestment.save();
    res.status(201).json({ message: 'Investment added successfully' });
  } catch (err) {
    console.error('Error adding investment:', err.message);
    res.status(500).json({ message: 'Failed to add investment' });
  }
};

// Get all investments for user
const getInvestments = async (req, res) => {
  try {
    const userId = req.user;
    const investments = await Investment.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(investments);
  } catch (err) {
    console.error('Error fetching investments:', err.message);
    res.status(500).json({ message: 'Failed to fetch investments' });
  }
};

module.exports = {
  addInvestment,
  getInvestments
};
