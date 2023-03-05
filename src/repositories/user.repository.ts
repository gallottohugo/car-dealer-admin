import { User } from '@prisma/client';
import prisma from '../config/prisma.client';
export class UserRepository {
  private prisma;
  constructor() {
    this.prisma = prisma
  }

  async login(email: string, password: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
        password: password,
      }
    })
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
      }
    })
  }
}
