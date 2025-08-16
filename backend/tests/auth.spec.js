import request from 'supertest';
import app from '../index.js';

const unique = () => `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;

describe('Auth API (3 tests)', () => {
  it('POST /api/auth/register -> 201 y retorna token', async () => {
    const email = `reg_${unique()}@umbral.com`;
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email, password: '123456', username: 'shadow' });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeTruthy();
    expect(res.body.email).toBe(email);
  });

  it('POST /api/auth/login con password incorrecta -> 400', async () => {
    const email = `badpwd_${unique()}@umbral.com`;
    await request(app)
      .post('/api/auth/register')
      .send({ email, password: '123456', username: 'shadow' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email, password: 'WRONG' });

    expect(res.status).toBe(400);
  });

  it('GET /api/auth/me con token -> 200 y objeto de perfil', async () => {
    const email = `me_${unique()}@umbral.com`;
    const { body: reg } = await request(app)
      .post('/api/auth/register')
      .send({ email, password: '123456', username: 'shadow' });

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${reg.token}`)
      .send();

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.email).toBe(email);
  });
});
