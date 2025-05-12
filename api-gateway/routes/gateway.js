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
  pathRewrite: { '^/api/(crypto|stocks)': '' },
  onProxyReq: (proxyReq, req) => {
    const token = req.cookies.token;
    if (token) {
      proxyReq.setHeader('Authorization', `Bearer ${token}`);
    }
    if (req.user?.id) {
      proxyReq.setHeader('x-user-id', req.user.id);
    }
  }
});

// Use for routing and auth
router.use('/crypto', authenticateToken, createProxyMiddleware(proxyOptions(getTarget('CRYPTO_SERVICE_URL'))));
router.use('/stocks', authenticateToken, createProxyMiddleware(proxyOptions(getTarget('STOCK_SERVICE_URL'))));

export default router;
