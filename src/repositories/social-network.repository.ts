import { SocialNetwork } from '@prisma/client';
import prisma from '../config/prisma.client';
export class SocialNetworkRepository {
  private prisma;
  constructor() {
    this.prisma = prisma
  }

  async findByDealer(dealerId: number): Promise<Array<SocialNetwork>> {
    return await this.prisma.socialNetwork.findMany({
      where: {
        dealerId: dealerId
      }
    })
  }

  async find(id: number): Promise<SocialNetwork | null> {
    return await this.prisma.socialNetwork.findFirst({
      where: {
        id: id
      }
    })
  }

  async create(resource: SocialNetwork): Promise<SocialNetwork> {
    return await this.prisma.socialNetwork.create({
      data: resource,
    })
  }
}
