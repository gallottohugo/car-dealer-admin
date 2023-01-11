import { PrismaClient, User } from '@prisma/client';
export class UserRepository {
  private prisma;
  constructor() {
    this.prisma = new PrismaClient()
  }

  async login(email: string, password: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
        password: password,
      }
    })
  }
}
