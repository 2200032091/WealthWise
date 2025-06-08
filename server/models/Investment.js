const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['crypto', 'stock'],
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  buyPrice: {
    type: Number,
    required: true
  },
  buyDate: {
    type: Date,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Investment', investmentSchema);
