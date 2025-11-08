const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'API working and server is running(github actions)' });
});

module.exports = router;

