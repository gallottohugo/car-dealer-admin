import { Response } from 'express';

export const renderUnauthorized = (res: Response): void => {
  res.status(401).send({ code: 'access_denied', detail: 'Access Denied' });
}

export const renderUnprocessableEntity = (res: Response, detail: string): void => {
  res.status(422).send({ code: 'unprocessable_entity', detail: detail });
}
