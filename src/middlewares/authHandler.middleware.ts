import { DealerRepository } from '../repositories/dealer.repository';
import { renderUnauthorized } from '../helpers/raw_helpers';
import { NextFunction, Request, Response } from 'express';

export const authHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const apiKey = req.get('x-api-key')
  if (!apiKey) { renderUnauthorized(res); return; }

  const dealer = await new DealerRepository().findByApiKey(apiKey)
  if (!dealer) { renderUnauthorized(res); return; }

  res.locals.currentDealer = dealer
  next()
}
