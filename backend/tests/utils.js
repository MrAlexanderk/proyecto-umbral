import request from 'supertest';
import app from '../index.js';

export const authHeader = (token) => ({ Authorization: `Bearer ${token}` });

export const registerUser = async (overrides = {}) => {
  const payload = {
    email: `test_${Date.now()}@umbral.com`,
    password: '123456',
    username: 'shadow',
    ...overrides,
  };
  const res = await request(app).post('/api/auth/register').send(payload);
  return { res, payload };
};

export const loginUser = async ({ email, password }) => {
  return request(app).post('/api/auth/login').send({ email, password });
};

export const createArtifact = async (token, overrides = {}) => {
  const base = {
    type_id: 2,
    status_id: 1,
    name: 'Mirror of Fate',
    description: 'A mirror to see the future',
    history: 'Whispered in Venice',
    price: 2500,
    age: 120,
    origin: 'Venice',
    image: 'https://picsum.photos/seed/mirror/800/600',
    ...overrides,
  };

  const res = await request(app)
    .post('/api/artifacts')
    .set(authHeader(token))
    .send(base);

  return { res, base };
};
