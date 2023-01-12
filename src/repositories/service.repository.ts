import { PrismaClient, Service } from '@prisma/client';
export class ServiceRepository {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient()
  }

  async findByDealer(dealerId: number): Promise<Array<Service>> {
    return await this.prisma.service.findMany({
      where: {
        dealerId: dealerId
      }
    })
  }

  async find(id: number): Promise<Service | null> {
    return await this.prisma.service.findFirst({
      where: {
        id: id
      }
    })
  }

  async create(resource: Service): Promise<Service> {
    return await this.prisma.service.create({
      data: resource,
    })
  }
}
