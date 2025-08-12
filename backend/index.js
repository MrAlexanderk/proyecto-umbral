// index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRoutes from './src/routes/auth.routes.js';
import artifactRoutes from './src/routes/artifact.routes.js';
import categoryRoutes from './src/routes/category.routes.js';
import { notFound, errorHandler } from './src/middlewares/error.middleware.js';

const app = express();

// Middlewares base
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(express.json());

// Healthcheck
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'embrujados-api' }));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/artifacts', artifactRoutes);
app.use('/api/categories', categoryRoutes);

// 404 + handler de errores
app.use(notFound);
app.use(errorHandler);

// Exporta la app para supertest
export default app;

// Solo levantar el server si este archivo se ejecuta directamente
if (process.env.NODE_ENV !== 'test' && import.meta.url === `file://${process.argv[1]}`) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`API listening at http://localhost:${PORT}`);
  });
}
