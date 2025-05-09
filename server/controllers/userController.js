const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error("Profile fetch error:", err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { getProfile };
