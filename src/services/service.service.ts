import { Service } from '@prisma/client';
import { ServiceRepository } from '../repositories/service.repository';
export class ServiceService {

  private serviceRepository: ServiceRepository;

  constructor() {
    this.serviceRepository = new ServiceRepository();
  }
  
  async findByDealer(dealerId: number): Promise<Array<Service>> {
    return await this.serviceRepository.findByDealer(dealerId)
  }

  async find(id: number): Promise<Service | null> {
    return await this.serviceRepository.find(id);
  }

  async create(resource: Service): Promise<Service>{
    return await this.serviceRepository.create(resource);
  }
}
