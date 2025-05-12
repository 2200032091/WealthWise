import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import cookieParser from 'cookie-parser';
import gatewayRoutes from './routes/gateway.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });
console.log('[DEBUG] ENV:', process.env);
const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use('/api', gatewayRoutes);

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
