const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  console.log('[AUTH] Headers:', req.headers); // 👈

  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.log('[AUTH] No Authorization header');
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log('[AUTH] Extracted token:', token); // 👈

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // 👈 Double check this!
    console.log('[AUTH] Decoded user:', decoded); // 👈
    req.user = decoded; // Add the decoded token to req.user
    next();
  } catch (err) {
    console.error('[AUTH ERROR]', err.message);
    return res.status(401).json({ message: 'User not authenticated' });
  }
};

module.exports = authenticateToken;
