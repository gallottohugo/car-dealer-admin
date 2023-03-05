
import { Car } from "@prisma/client"
import prisma from "../../prisma/prisma.client"

export interface CarInterface {
  name: string,
  license: string,
  description?: string,
  dealerId: number
}

export async function createCar(car: CarInterface): Promise<Car> {
  return await prisma.car.create({
    data: car
  })
}

export async function createManyCars(cars: Array<CarInterface>): Promise<void> {
  await prisma.car.createMany({
    data: cars
  })
}

