import { Car } from '@prisma/client';
import { CarService } from '../services/car.service';

export class CarsController {
  private carService: CarService
  constructor() {
    this.carService = new CarService();
  }

  async findByDealer(delaerId: number): Promise<Array<Car>>  {
    const cars = await this.carService.findByDealer(delaerId)
    return cars 
  }

  async find(id: number): Promise<Car | null> {
    const car = await this.carService.find(id)
    return car;
  }
}
