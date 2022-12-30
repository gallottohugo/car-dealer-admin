
  
import express, { Request, Response, Router } from 'express';
import { CarsController } from '../controllers/cars.controller';
import asyncHandler from 'express-async-handler';

const controller = new CarsController();

export const CarsRoutes = Router()
  .get('/', asyncHandler(async (req: Request, res: Response): Promise<void> => {
    
    const response = await controller.cars();
      res.json(response);
  }))
  .get('/:id', asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const carId = req.params['id']
    const response = await controller.car(+carId);
      res.json(response);
  }))
