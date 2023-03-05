import { Dealer } from '@prisma/client';
import prisma from '../config/prisma.client';

export class DealerRepository {
  private prisma;
  constructor() {
    this.prisma = prisma
  }

  async findByApiKey(apiKey: string): Promise<Dealer | null> {
    return await this.prisma.dealer.findFirst({
      where: {
        apiKey: apiKey
      }
    })
  }
}
