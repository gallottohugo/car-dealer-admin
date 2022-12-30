
import express from 'express';
import { CarsRoutes } from './cars.routes';

export const ApiRoutes = express.Router()
ApiRoutes.use('/cars', CarsRoutes)
