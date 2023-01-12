import { Car } from '@prisma/client';
import { CarRepository } from '../repositories/car.respository';
export class CarService {

  private carRepository: CarRepository;

  constructor() {
    this.carRepository = new CarRepository();
  }
  
  async findByDealer(dealerId: number): Promise<Array<Car>> {
    return await this.carRepository.findByDealer(dealerId)
  }

  async find(id: number): Promise<Car | null> {
    return await this.carRepository.find(id);
  }

  async create(resource: Car): Promise<Car>{
    return await this.carRepository.create(resource);
  }
}
