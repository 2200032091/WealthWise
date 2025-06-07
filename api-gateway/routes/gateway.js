import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authenticateToken } from '../middleware/authMiddleware.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const router = express.Router();

router.use(express.json());

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

// Public route (no auth)
router.use(
  '/crypto/prices',
  createProxyMiddleware(proxyOptions(getTarget('CRYPTO_SERVICE_URL')))
);

// Protected watchlist route with path rewrite
router.use(
  '/crypto/watchlist',
  authenticateToken,
  createProxyMiddleware({
    target: getTarget('CRYPTO_SERVICE_URL'),
    changeOrigin: true,
    pathRewrite: (path, req) => {
  const rewritten = req.originalUrl.replace(/^\/api\/crypto\/watchlist/, '/api/watchlist');
  console.log('🔁 Original URL:', req.originalUrl);
  console.log('🔁 Rewritten path:', rewritten);
  return rewritten;
},

    onProxyReq: (proxyReq, req) => {
      const authHeader = req.headers['authorization'];
      if (authHeader) {
        proxyReq.setHeader('Authorization', authHeader);
      }
      if (
    req.body &&
    Object.keys(req.body).length &&
    ['POST', 'PUT', 'PATCH'].includes(req.method)
  ) {
    const bodyData = JSON.stringify(req.body);
    proxyReq.setHeader('Content-Type', 'application/json');
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    proxyReq.write(bodyData);
  }
    }
  })
);


// Test routes
router.use('/crypto/test', (req, res) => {
  res.send('✅ API Gateway is working!');
});

router.use('/crypto/watchlist/test', (req, res) => {
  res.send('✅ Gateway watchlist route works');
});

// Stock service routing (protected)

// Stock watchlist routes
router.use(
  '/stocks/watchlist',
  authenticateToken,
  createProxyMiddleware({
    target: getTarget('STOCK_SERVICE_URL'),
    changeOrigin: true,
    pathRewrite: (path, req) => {
      const rewritten = req.url.replace(/^\/api\/stocks\/watchlist/, '/api/stocks/watchlist');
      console.log('🔁 Rewritten path:', rewritten);
      return rewritten;
    },
    onProxyReq: (proxyReq, req) => {
      const authHeader = req.headers['authorization'];
      if (authHeader) {
        proxyReq.setHeader('Authorization', authHeader);
      }
      if (
        req.body &&
        Object.keys(req.body).length &&
        ['POST', 'PUT', 'PATCH'].includes(req.method)
      ) {
        console.log('Request Body:', req.body);
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    }
  })
);

router.use(
  '/stocks',
  authenticateToken,
  createProxyMiddleware({
    ...proxyOptions(getTarget('STOCK_SERVICE_URL')),
    pathRewrite: {
      '^/stocks': '/api/stocks' //  Rewrite to match stock service
    }
  })
  
);


export default router;
