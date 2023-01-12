import { PrismaClient, Contact } from '@prisma/client';
export class ContactRepository {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient()
  }

  async findByDealer(dealerId: number): Promise<Array<Contact>> {
    return await this.prisma.contact.findMany({
      where: {
        dealerId: dealerId
      }
    })
  }

  async find(id: number): Promise<Contact | null> {
    return await this.prisma.contact.findFirst({
      where: {
        id: id
      }
    })
  }

  async create(resource: Contact): Promise<Contact> {
    return await this.prisma.contact.create({
      data: resource,
    })
  }
}
