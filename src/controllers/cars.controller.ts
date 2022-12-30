import { CarService } from '../services/car.service';
import express, {Request, Response} from 'express';
import Router from 'express';

export class CarsController {
  private carService: CarService
  constructor() {
    this.carService = new CarService();
  }

  async cars() {
    const cars = await this.carService.cars()
    return cars 
  }

  async car(carId: number) {
    const car = await this.carService.car(carId)
    return car;
  }
}
