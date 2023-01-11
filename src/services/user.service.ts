import { User } from '@prisma/client';
import { UserRepository } from '../repositories/user.repository';

export class UserService {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
  
  async login(email: string, password: string): Promise<User | null > {
    return await this.userRepository.login(email, password)
  }
}
