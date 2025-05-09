const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware'); // Import the protect middleware
const transactionController = require('../controllers/transactionController');

// Protect routes that need authentication
router.post('/', protect, transactionController.addTransaction); // Requires valid JWT token
router.get('/', protect, transactionController.getTransactions); // Requires valid JWT token
router.get('/test-protected', protect, (req, res) => {
    res.json({ msg: 'Token valid ✅', userId: req.user });
  });
module.exports = router;
