const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const stockRoutes = require('./routes/stockRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');
const connectStockDB = require('./config/db');
connectStockDB(); // before app.listen

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/stocks', stockRoutes);
app.use('/api/stocks/watchlist', watchlistRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Stock service is running 🚀' });
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Stock service running on port ${PORT}`);
});
