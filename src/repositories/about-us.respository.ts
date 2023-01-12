import { PrismaClient, AboutUs } from '@prisma/client';
export class AboutUsRepository {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient()
  }

  async findByDealer(dealerId: number): Promise<Array<AboutUs>> {
    return await this.prisma.aboutUs.findMany({
      where: {
        dealerId: dealerId
      }
    })
  }

  async find(id: number): Promise<AboutUs | null> {
    return await this.prisma.aboutUs.findFirst({
      where: {
        id: id
      }
    })
  }

  async create(resource: AboutUs): Promise<AboutUs> {
    return await this.prisma.aboutUs.create({
      data: resource,
    })
  }
}