const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Registration data received:', req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    const newUser = await User.create({ name, email, password: hashedPassword });
    console.log('New user created:', newUser);

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ user: newUser, token });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        console.log('❌ User not found');
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('❌ Password mismatch');
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      console.log(token);
      res.status(200).json({ user, token });
  
    } catch (err) {
      console.error('💥 Login error:', err);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  
module.exports = { register, login };
