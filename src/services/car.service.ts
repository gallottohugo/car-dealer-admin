import { CarRepository } from '../repositories/car.respository';
export class CarService {

  private carRepository: CarRepository;

  constructor() {
    this.carRepository = new CarRepository();
  }
  
  async cars() {
    return await this.carRepository.cars()
  }

  async car(carId: number) {
    return await this.carRepository.car(carId);
  }
}
