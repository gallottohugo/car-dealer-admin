import { Car } from '@prisma/client';
import { CarService } from '../services/car.service';

export class CarController {
  private carService: CarService
  constructor() {
    this.carService = new CarService();
  }

  async findByDealer(delaerId: number): Promise<Array<Car>>  {
    return await this.carService.findByDealer(delaerId)
  }

  async find(id: number): Promise<Car | null> {
    return await this.carService.find(id)
  }
}
