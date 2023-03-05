import { app } from '../../../app';
import request from 'supertest';
import { createDealer } from '../../factories/dealer.factory';
import { Dealer } from '@prisma/client';
import { CarInterface, createManyCars } from '../../factories/car.factory';
import prisma from '../../../prisma/prisma.client';

describe('GET /api/v1/cars', () => {

  let dealer: Dealer; 
  let car1: CarInterface;
  let car2: CarInterface;
  beforeAll(async () => {
    dealer = await createDealer()

    car1 = {
      id: 1,
      name: 'Peugeot 208',
      license: 'AB876QC',
      description: 'Red car',
      dealerId: dealer.id
    }

    car2 = {
      id: 2,
      name: 'Ford Focus',
      license: 'GT654FD',
      description: '',
      dealerId: dealer.id
    }

    await createManyCars([car1, car2 ]);
  });
  

  it('200 OK ', async () => {
    await request(app)
      .get('/api/v1/cars')
      .set('x-api-key', dealer.apiKey)
      .set('x-api-secret', 'apisecret')
      .expect(200)
      .expect(response => expect(response.body[0].name).toEqual(car1.name))
      .expect(response => expect(response.body[0].license).toEqual(car1.license))
      .expect(response => expect(response.body[0].description).toEqual(car1.description))
      .expect(response => expect(response.body[0].dealerId).toEqual(car1.dealerId))

      .expect(response => expect(response.body[1].name).toEqual(car2.name))
      .expect(response => expect(response.body[1].license).toEqual(car2.license))
      .expect(response => expect(response.body[1].description).toEqual(car2.description))
      .expect(response => expect(response.body[1].dealerId).toEqual(car2.dealerId))
  })


  afterAll(async () => {
    const deleteCars = prisma.car.deleteMany();
    const deleteDealer = prisma.dealer.deleteMany();

    await prisma.$transaction([
      deleteCars,
      deleteDealer,
    ])
  
    await prisma.$disconnect();
  })
});
