import { Car } from '@prisma/client';
import { CarRepository } from '../repositories/car.respository';
export class CarService {

  private carRepository: CarRepository;

  constructor() {
    this.carRepository = new CarRepository();
  }
  
  async cars(): Promise<Array<Car>> {
    return await this.carRepository.cars()
  }

  async car(carId: number): Promise<Car | null> {
    return await this.carRepository.car(carId);
  }
}
