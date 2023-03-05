import { CarProperty } from '@prisma/client';
import prisma from '../../prisma/prisma.client';

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
}
