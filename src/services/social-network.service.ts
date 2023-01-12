import { SocialNetworkRepository } from "../repositories/social-network.repository";
import { SocialNetwork } from '@prisma/client';

export class SocialNetworkService {

  private socialNetworkRepository: SocialNetworkRepository;

  constructor() {
    this.socialNetworkRepository = new SocialNetworkRepository();
  }
  
  async findByDealer(dealerId: number): Promise<Array<SocialNetwork>> {
    return await this.socialNetworkRepository.findByDealer(dealerId)
  }

  async find(id: number): Promise<SocialNetwork | null> {
    return await this.socialNetworkRepository.find(id);
  }

  async create(resource: SocialNetwork): Promise<SocialNetwork>{
    return await this.socialNetworkRepository.create(resource);
  }
}
