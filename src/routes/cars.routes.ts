import { Request, Response, Router } from 'express';
import { CarController } from '../controllers/car.controller';
import asyncHandler from 'express-async-handler';
import { renderUnprocessableEntity } from '../helpers/response.helper';

const controller = new CarController();

export const CarsRoutes = Router()
  .get('/', asyncHandler(async (req: Request, res: Response): Promise<void> => {

    const dealerId = res.locals.currentDealer.id
    if (!dealerId) {
      renderUnprocessableEntity(res, 'Invalid Dealer')
      return;
    }

    const response = await controller.findByDealer(dealerId);
    res.json(response);
  }))
  .get('/:id', asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const carId = req.params['id']
    const response = await controller.find(+carId);
      res.json(response);
  }))
