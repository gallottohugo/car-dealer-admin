import { app } from '../../../app';
import request from 'supertest';
import { createDealer } from '../../factories/dealer.factory';
import { Dealer, Car } from '@prisma/client';
import { createCar } from '../../factories/car.factory';
import prisma from '../../../prisma/prisma.client';

describe('GET /api/v1/cars', () => {

  let dealer: Dealer; 
  let car: Car;
  beforeAll(async () => {
    dealer = await createDealer()
    car = await createCar({
      id: 1,
      name: 'Peugeot 208',
      license: 'AB876QC',
      description: 'Red car',
      dealerId: dealer.id
    });
    
  });
  

  it('200 OK ', async () => {
    await request(app)
      .get('/api/v1/cars')
      .set('x-api-key', dealer.apiKey)
      .set('x-api-secret', 'apisecret')
      .expect(200)
      .expect(response => expect(response.body[0].name).toEqual(car.name))
      .expect(response => expect(response.body[0].license).toEqual(car.license))
      .expect(response => expect(response.body[0].description).toEqual(car.description))
      .expect(response => expect(response.body[0].dealerId).toEqual(car.dealerId))
  })


  afterAll(async () => {
    const deleteCars = prisma.car.deleteMany();
    const deleteDealer = prisma.dealer.deleteMany();

    await prisma.$transaction([
      deleteCars,
      deleteDealer,
    ])
  
    await prisma.$disconnect()
  })
});
