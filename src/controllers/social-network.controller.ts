import { SocialNetworkService } from '../services/social-network.service';
import { SocialNetwork } from '@prisma/client';

export class SocialNetworkController {
  private socialNetworkService: SocialNetworkService
  constructor() {
    this.socialNetworkService = new SocialNetworkService();
  }

  async findByDealer(delaerId: number): Promise<Array<SocialNetwork>>  {
    return await this.socialNetworkService.findByDealer(delaerId)
  }
}
