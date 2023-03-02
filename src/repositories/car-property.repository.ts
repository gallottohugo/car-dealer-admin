import { PrismaClient, CarProperty } from '@prisma/client';
export class CarPropertyRepository {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient()
  }

  async findByCar(carId: number): Promise<Array<CarProperty>> {
    return await this.prisma.carProperty.findMany({
      where: {
        carId: carId
      }
    })
  }
}
