import { PrismaClient } from '@prisma/client';
export class CarRepository {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient()
  }

  async cars() {
    return await this.prisma.car.findMany()
  }

  async car(carId: number) {
    return await this.prisma.car.findFirst({
      where: {
        id: carId
      }
    })
  }
}
