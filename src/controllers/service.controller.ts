import { Service } from '@prisma/client';
import { ServiceService } from '../services/service.service';

export class ServiceController {
  private serviceService: ServiceService
  constructor() {
    this.serviceService = new ServiceService();
  }

  async findByDealer(delaerId: number): Promise<Array<Service>>  {
    return await this.serviceService.findByDealer(delaerId)
  }
}
