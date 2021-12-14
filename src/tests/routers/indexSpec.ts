import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);
describe('Test /api response', () => {
  it('Get test to /api ', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
});