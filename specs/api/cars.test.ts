import { app } from '../../app';
import request from 'supertest';
/* eslint-disable */

let resp: any;

describe('GET /api/v1/cars', () => {
  it('get cars', async () => {
    await request(app)
      .get('/api/v1/cars')
      .set('x-api-key', 'apikey')
      .set('x-api-secret', 'apisecret')
      .expect(200)
      .expect(response => expect(console.log(response.body)))
  })
});
