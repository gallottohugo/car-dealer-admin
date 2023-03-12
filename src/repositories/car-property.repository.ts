import { CarProperty } from '@prisma/client';
import prisma from '../../prisma/prisma.client';
import { ICarProperty } from '../interfaces/car-property.interface';

export class CarPropertyRepository {
  private prisma;
  constructor() {
    this.prisma = prisma
  }

  async findByCar(carId: number): Promise<Array<CarProperty>> {
    return await this.prisma.carProperty.findMany({
      where: {
        carId: carId
      }
    })
  }

  async create(resource: ICarProperty): Promise<CarProperty> {
    return await this.prisma.carProperty.create({
      data: resource,
    })
  }
}
