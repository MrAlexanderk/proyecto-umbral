import request from 'supertest';
import app from '../index.js';

const unique = () => `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
const authHeader = (t) => ({ Authorization: `Bearer ${t}` });

async function registerAndGetToken() {
  const email = `u_${unique()}@umbral.com`;
  const { body } = await request(app)
    .post('/api/auth/register')
    .send({ email, password: '123456', username: 'shadow' });
  return { token: body.token, email };
}

const pickArray = (body) => Array.isArray(body) ? body : (Array.isArray(body?.data) ? body.data : []);

describe('Artifacts API (3 tests)', () => {
  it('GET /api/artifacts es PÚBLICA -> 200 y Array (o data[])', async () => {
    const res = await request(app).get('/api/artifacts').query({ page: 1, limit: 5 });
    expect(res.status).toBe(200);

    const arr = pickArray(res.body);
    expect(Array.isArray(arr)).toBe(true);
  });

  it('POST /api/artifacts -> 201 y aparece en /api/artifacts/user', async () => {
    const { token } = await registerAndGetToken();

    const create = await request(app)
      .post('/api/artifacts')
      .set(authHeader(token))
      .send({
        type_id: 2,
        status_id: 1,
        name: 'Mirror of Fate',
        description: 'A mirror to see the future',
        history: 'Whispered in Venice',
        price: 2500,
        age: 120,
        origin: 'Venice',
        image: 'https://picsum.photos/seed/mirror/800/600'
      });

    expect(create.status).toBe(201);
    const created = create.body;

    const my = await request(app)
      .get('/api/artifacts/user')
      .set(authHeader(token))
      .query({ page: 1, limit: 100 });

    expect(my.status).toBe(200);
    const mine = pickArray(my.body);
    expect(mine.find(a => a.id === created.id)).toBeTruthy();
  });

  it('PUT /api/artifacts/:id con otro usuario -> 403 (o 404 si tu update filtra por owner)', async () => {
    // Owner crea
    const owner = await registerAndGetToken();
    const created = await request(app)
      .post('/api/artifacts')
      .set(authHeader(owner.token))
      .send({
        type_id: 2,
        status_id: 1,
        name: 'Private Relic',
        price: 5000
      });

    const artifactId = created.body.id;

    // Otro usuario intenta editar
    const other = await registerAndGetToken();
    const upd = await request(app)
      .put(`/api/artifacts/${artifactId}`)
      .set(authHeader(other.token))
      .send({ name: 'Hacked Name' });

    expect([403, 404]).toContain(upd.status);
  });
});
