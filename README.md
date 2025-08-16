El Umbral — Cursed Artifacts Marketplace
Marketplace de compra/venta de artefactos embrujados.
Frontend en React + Vite y backend en Node.js + Express (ESM) con PostgreSQL (Render) y JWT.

Detalle:
MVC en backend: Rutas → Controladores → Modelos.
Autenticación: JWT (Bearer) + middleware de autorización.
DB: pg con pool y consultas parametrizadas.
CORS: habilitado para el origen del frontend.

Tecnologías
Backend: Node.js (ESM), Express, pg, jsonwebtoken, cors, dotenv, nanoid
Frontend: React + Vite, Axios, React Context API, SweetAlert2
DB: PostgreSQL (Render.com)
Dev: nodemon
Tests: Supertest (sugerido)


Requisitos
Node.js 18+
npm

Acceso a una base PostgreSQL (Render)

Cliente psql o SQL Shell (psql) para ejecutar el schema

Variables de entorno
Backend:
  JWT_SECRET=
  PORT=
  DATABASE_URL=
  JWT_EXPIRES=
  CORS_ORIGIN=
Frontend:
  VITE_API_URL=
