import { Car } from '@prisma/client';
import { CarService } from '../services/car.service';

export class CarsController {
  private carService: CarService
  constructor() {
    this.carService = new CarService();
  }

  async cars(): Promise<Array<Car>>  {
    const cars = await this.carService.cars()
    return cars 
  }

  async car(carId: number): Promise<Car | null> {
    const car = await this.carService.car(carId)
    return car;
  }
}
