# 🕯️ El Umbral — Cursed Artifacts Marketplace

> **Marketplace de compra y venta de artefactos embrujados**  
Un proyecto fullstack con **React + Vite (frontend)** y **Node.js + Express + PostgreSQL (backend)**, desplegado en **Render**, con autenticación mediante **JWT**.

---

## ✨ Arquitectura

### 📌 Backend
- **Patrón MVC**: Rutas → Controladores → Modelos  
- **Autenticación**: JWT (Bearer) + middleware de autorización  
- **Base de datos**: PostgreSQL con `pg` (pool + consultas parametrizadas)  
- **CORS**: configurado para aceptar el origen del frontend  

### 📌 Frontend
- React + Vite  
- Manejo de estado con **React Context API**  
- Llamadas a la API con **Axios**  
- Notificaciones con **SweetAlert2**

---

## 🛠️ Tecnologías principales

**Backend**
- Node.js (ESM)  
- Express  
- pg  
- jsonwebtoken  
- cors  
- dotenv  
- nanoid  

**Frontend**
- React + Vite  
- Axios  
- React Context API  
- SweetAlert2  

**Base de datos**
- PostgreSQL (Render.com)

**Desarrollo y tests**
- nodemon  
- Supertest (sugerido para pruebas)

---

## 📋 Requisitos

- Node.js **18+**  
- npm  
- Acceso a una base de datos **PostgreSQL (Render)**  
- Cliente `psql` o SQL Shell para ejecutar el schema

---

## ⚙️ Variables de entorno

### Backend
```env
JWT_SECRET=
PORT=
DATABASE_URL=
JWT_EXPIRES=
CORS_ORIGIN=
