import { DealerRepository } from '../repositories/dealer.repository';
import { renderUnauthorized } from '../helpers/response.helper';
import { NextFunction, Request, Response } from 'express';

export const authHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // TODO: add secure-compare
  const apiKey = req.get('x-api-key')
  const apiSecret = req.get('x-api-secret')
  if (!apiKey || !apiSecret) { renderUnauthorized(res); return; }

  if (apiSecret !== process.env.API_SECRET) { renderUnauthorized(res); return; }

  const dealer = await new DealerRepository().findByApiKey(apiKey)
  if (!dealer) { renderUnauthorized(res); return; }

  res.locals.currentDealer = dealer
  next()
}
