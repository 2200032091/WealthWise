import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

//import cookieParser from 'cookie-parser';
import gatewayRoutes from './routes/gateway.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });
console.log('[DEBUG] ENV:', process.env);
const app = express();
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:3001'], // Allow both origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
//app.use(cookieParser());
app.use(express.json());

app.use('/api', gatewayRoutes);

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
