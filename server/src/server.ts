import 'dotenv/config';
import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';

import ordersRouter from './routes/orders.js';
import { HttpError } from './utils/HttpError.js';
import mongoose from 'mongoose';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
  }),
);

app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'shopsphere-api',
  });
});

app.use('/api/orders', ordersRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'API endpoint not found.',
  });
});

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.log(error);

  res.status(500).json({
    message: 'An unexpected server error occured.',
  });
};

app.use(errorHandler);

async function startServer() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is missing from server/.env');
  }

  await mongoose.connect(mongoUri);

  const port = Number(process.env.API_PORT ?? 4000);

  app.listen(port, () => {
    console.log(`ShopSphere API running on http://localhost:${port}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Failed to start ShopSphere API', error);
  process.exitCode = 1;
});
