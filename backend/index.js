import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRoutes from './src/routes/auth.routes.js';

import { notFound, errorHandler } from './src/middlewares/error.middleware.js';

const app = express();

// Middlewares base
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

// Healthcheck
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'embrujados-api' }));

// Rutas de la API
app.use('/api/auth', authRoutes);

// 404 + handler de errores
app.use(notFound);
app.use(errorHandler);

// Exporta la app para supertest
export default app;

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`API listening at http://localhost:${PORT}`);
    console.log(`CORS_ORIGIN = ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
  });
}
