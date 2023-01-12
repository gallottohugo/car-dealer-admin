import { AboutUs } from '@prisma/client';
import { AboutUsRepository } from '../repositories/about-us.respository';

export class AboutUsService {

  private aboutUsRepository: AboutUsRepository;

  constructor() {
    this.aboutUsRepository = new AboutUsRepository();
  }
  
  async findByDealer(dealerId: number): Promise<Array<AboutUs>> {
    return await this.aboutUsRepository.findByDealer(dealerId)
  }

  async find(id: number): Promise<AboutUs | null> {
    return await this.aboutUsRepository.find(id);
  }

  async create(resource: AboutUs): Promise<AboutUs> {
    return await this.aboutUsRepository.create(resource);
  }
}
