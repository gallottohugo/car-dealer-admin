import express, { Request, Response, Router } from 'express';

const _rootDir = process.cwd();

export const WebsiteRoutes = express.Router()
WebsiteRoutes.use('/', Router()
  .get('/', (req: Request, res: Response) => {
    res.sendFile('./src/website/index.html', { root: _rootDir });
  })
  .get('/home', (req: Request, res: Response) => {
    res.sendFile('./src/website/index.html', { root: _rootDir });
  })
  .get('/cars', (req: Request, res: Response) => {
    res.sendFile('./src/website/cars.html', { root: _rootDir });
  })
  .get('/car-details', (req: Request, res: Response) => {
    res.sendFile('./src/website/car-details.html', { root: _rootDir });
  })
  .get('/contact', (req: Request, res: Response) => {
    res.sendFile('./src/website/contact.html', { root: _rootDir });
  })
  .get('/about-us', (req: Request, res: Response) => {
    res.sendFile('./src/website/about-us.html', { root: _rootDir });
  })
  .get('/services', (req: Request, res: Response) => {
    res.sendFile('./src/website/services.html', { root: _rootDir });
  })
);
