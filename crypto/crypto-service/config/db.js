// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected (Crypto Service)');
  } catch (err) {
    console.error('❌ Error connecting MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
