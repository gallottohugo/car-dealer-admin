import { PrismaClient, Car } from '@prisma/client';
export class CarRepository {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient()
  }

  async findByDealer(dealerId: number): Promise<Array<Car>> {
    return await this.prisma.car.findMany({
      where: {
        dealerId: dealerId
      }
    })
  }

  async find(id: number): Promise<Car | null> {
    return await this.prisma.car.findFirst({
      where: {
        id: id
      }
    })
  }

  async create(resource: Car): Promise<Car> {
    return await this.prisma.car.create({
      data: resource,
    })
  }
}
