import { AboutUs } from '@prisma/client';
import { AboutUsService } from '../services/about-us.service';

export class AboutUsController {
  private aboutUsService: AboutUsService
  constructor() {
    this.aboutUsService = new AboutUsService();
  }

  async findByDealer(delaerId: number): Promise<Array<AboutUs>>  {
    return await this.aboutUsService.findByDealer(delaerId)
  }
}
