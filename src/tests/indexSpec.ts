import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test "root"=>"/" endpoint response', () => {
  it('Get test to "root"=>"/"', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
