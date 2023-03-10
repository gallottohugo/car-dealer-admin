import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { renderUnprocessableEntity } from '../helpers/response.helper';
import { ServiceController } from '../controllers/service.controller';

const controller = new ServiceController();

export const ServicesRoutes = Router()
  .get('/', asyncHandler(async (req: Request, res: Response): Promise<void> => {

    const dealerId = res.locals.currentDealer.id
    if (!dealerId) {
      renderUnprocessableEntity(res, 'Invalid Dealer')
      return;
    }

    const response = await controller.findByDealer(dealerId);
    res.json(response);
  }))
  /* .get('/:id', asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const carId = req.params['id']
    const response = await controller.find(+carId);
      res.json(response);
  })) */
