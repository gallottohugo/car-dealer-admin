
import express from 'express';
import { CarsRoutes } from './cars.routes';

export const ApiRoutes = express.Router()
// TODO: Add healthcheck
ApiRoutes.use('/cars', CarsRoutes)
