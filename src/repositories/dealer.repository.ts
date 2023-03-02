import { PrismaClient, Dealer } from '@prisma/client';
export class DealerRepository {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient()
  }

  async findByApiKey(apiKey: string): Promise<Dealer | null> {
    return await this.prisma.dealer.findFirst({
      where: {
        apiKey: apiKey
      }
    })
  }
}
