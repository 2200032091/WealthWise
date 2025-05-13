import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authenticateToken } from '../middleware/authMiddleware.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const router = express.Router();

console.log('Loaded ENV:', {
  CRYPTO_SERVICE_URL: process.env.CRYPTO_SERVICE_URL,
  STOCK_SERVICE_URL: process.env.STOCK_SERVICE_URL
});

const getTarget = (key) => {
  const url = process.env[key];
  if (!url) {
    throw new Error(`[API GATEWAY] Missing service URL for ${key}`);
  }
  return url;
};

const proxyOptions = (target) => ({
  target,
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      proxyReq.setHeader('Authorization', authHeader);
    }
    console.log(`[GATEWAY] FORWARD: ${req.method} → ${proxyReq.getHeader('host')}${req.url}`);
  }
});

// ✅ Public - No token required
router.use(
  '/crypto/prices',
  createProxyMiddleware(proxyOptions(getTarget('CRYPTO_SERVICE_URL')))
);

// 🔐 Protected route with path rewrite
router.use(
  '/api/crypto/watchlist',
  authenticateToken,
  createProxyMiddleware({
    target: getTarget('CRYPTO_SERVICE_URL'),
    changeOrigin: true,
    pathRewrite: {
      '^/api/crypto/watchlist': '/api/watchlist'
    },
    onProxyReq: (proxyReq, req) => {
      const authHeader = req.headers['authorization'];
      if (authHeader) {
        proxyReq.setHeader('Authorization', authHeader);
      }
      console.log(`[GATEWAY] FORWARD: ${req.method} → ${proxyReq.getHeader('host')}${req.url}`);
    }
  })
);

// Test route
router.use('/crypto/test', (req, res) => {
  res.send("API Gateway is working!");
});

// 🔐 Stock service
router.use(
  '/stocks',
  authenticateToken,
  createProxyMiddleware(proxyOptions(getTarget('STOCK_SERVICE_URL')))
);

export default router;
