const express = require('express');
const cors = require('cors');
require('dotenv').config();

const cryptoRoutes = require('./routes/cryptoRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');
const app = express();
const PORT = process.env.PORT || 5002;
const connectDB = require('./config/db');
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/crypto', cryptoRoutes);
app.use('/api', (req, res, next) => {
  console.log(`[CRYPTO-SERVICE] HIT: ${req.method} ${req.originalUrl}`);
  next();
}, watchlistRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Crypto Service running on port ${PORT}`);
});
