import AdminJS from 'adminjs'

import express from 'express'
import * as AdminJSPrisma from '@adminjs/prisma'
import { ApiRoutes } from './src/routes/api.routes';
import { pinoMiddleware } from './src/config/logger'
import { adminJsAdmin, adminJsAdminRouter } from './src/middlewares/adminJs.middleware';
/* eslint-disable */
const cors = require('cors');

AdminJS.registerAdapter({
  Resource: AdminJSPrisma.Resource,
  Database: AdminJSPrisma.Database,
})


const apiAuthentication = () => {
  console.log('--------------')
  console.log('API AUTH')
  console.log('--------------')
}

const start = async () => {
  const app = express()
  app.use(cors())
  app.use(express.json());
  app.use('/api/v1/', apiAuthentication, ApiRoutes);
  app.use(pinoMiddleware);
  app.use(adminJsAdmin().options.rootPath, adminJsAdminRouter())
  app.listen(process.env.PORT, () => {
    console.log(`AdminJS started on http://localhost:${process.env.PORT}${adminJsAdmin().options.rootPath}`)
  })
}

start()
