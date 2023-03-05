import AdminJS from 'adminjs'
import express, { NextFunction, Request, Response } from 'express';
import * as AdminJSPrisma from '@adminjs/prisma'
import { ApiRoutes } from './src/routes/api.routes';
import { pinoMiddleware } from './src/config/logger'
import { adminJsAdmin, adminJsAdminRouter } from './src/middlewares/adminJs.middleware';
import { authHandler } from './src/middlewares/apiAuthHandler.middleware';
import cors from 'cors';

AdminJS.registerAdapter({
  Resource: AdminJSPrisma.Resource,
  Database: AdminJSPrisma.Database,
})

const apiV1Path = '/api/v1/';

const app = express()
app.use(cors())
app.use(express.json());
app.use(apiV1Path, authHandler, ApiRoutes);
app.use(pinoMiddleware);
app.use(adminJsAdmin().options.rootPath, adminJsAdminRouter())
if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, () => {
    console.log(`AdminJS started on http://localhost:${process.env.PORT}${adminJsAdmin().options.rootPath}`)
    console.log(`API V1 started on http://localhost:${process.env.PORT}${apiV1Path}`)
  })
}

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  res.status(500).json({ code: 'internal_server_error', detail: 'Something went wrong' });
  next()
})

export { app }
