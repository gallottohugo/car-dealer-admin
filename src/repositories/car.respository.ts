import { PrismaClient, Car } from '@prisma/client';
export class CarRepository {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient()
  }

  async cars(): Promise<Array<Car>> {
    return await this.prisma.car.findMany()
  }

  async car(carId: number): Promise<Car | null> {
    return await this.prisma.car.findFirst({
      where: {
        id: carId
      }
    })
  }
}
