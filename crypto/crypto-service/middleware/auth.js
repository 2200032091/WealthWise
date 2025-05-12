const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ message: 'Unauthorized: No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // make sure this matches how you're encoding it
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
