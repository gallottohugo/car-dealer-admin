
import express from 'express';
import { CarsRoutes } from './cars.routes';
import { SocialNetworksRoutes } from './social-network.routes';
import { ContactsRoutes } from './contacts.routes';
import { ServicesRoutes } from './services.routes';
import { AboutUsRoutes } from './about-us.routes';

export const ApiRoutes = express.Router()
// TODO: Add healthcheck
ApiRoutes.use('/cars', CarsRoutes)
ApiRoutes.use('/about-us', AboutUsRoutes)
ApiRoutes.use('/contacts', ContactsRoutes)
ApiRoutes.use('/services', ServicesRoutes)
ApiRoutes.use('/social-networks', SocialNetworksRoutes)
