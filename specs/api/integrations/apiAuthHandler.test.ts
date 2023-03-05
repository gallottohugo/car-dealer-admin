import { app } from '../../../app';
import request from 'supertest';
import { createDealer } from '../../factories/dealer.factory';
import { Dealer } from '@prisma/client';
import prisma from '../../../prisma/prisma.client';

describe('Auth Habdler', () => {
  let dealer: Dealer; 
  beforeAll(async () => {
    dealer = await createDealer()
  });
  
  it('Invalid Api Key - 401 Unauthorized', async () => {
    await request(app)
      .get('/api/v1/cars')
      .set('x-api-key', 'invalid-api-key')
      .set('x-api-secret', 'apisecret')
      .expect(401)
  })

  it('Invalid Api Secret - 401 Unauthorized', async () => {
    await request(app)
      .get('/api/v1/cars')
      .set('x-api-key', dealer.apiKey)
      .set('x-api-secret', 'invalid-apisecret')
      .expect(401)
  })

  afterAll(async () => {
    await prisma.dealer.delete({
      where: {
        id: dealer.id
      }
    });
    await prisma.$disconnect();
  })
});
