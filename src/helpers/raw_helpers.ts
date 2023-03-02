import { Response } from 'express';

export const renderUnauthorized = (res: Response): void => {
  res.status(401).send({ code: 'access_denied', detail: 'Access Denied' });
}
