const express = require('express');
const router = express.Router();
const { addInvestment, getInvestments } = require('../controllers/investmentController');
const protect = require('../middleware/authMiddleware'); 

router.post('/', protect, addInvestment);
router.get('/', protect, getInvestments);

module.exports = router;
