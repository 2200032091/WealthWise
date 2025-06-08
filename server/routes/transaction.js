const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware'); 
const transactionController = require('../controllers/transactionController');


router.post('/', protect, transactionController.addTransaction); 
router.get('/', protect, transactionController.getTransactions);
router.get('/test-protected', protect, (req, res) => {
    res.json({ msg: 'Token valid ✅', userId: req.user });
  });
module.exports = router;
