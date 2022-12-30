import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express, { NextFunction, Request, Response } from 'express'
import Connect from 'connect-pg-simple'
import session from 'express-session'
import * as AdminJSPrisma from '@adminjs/prisma'
import { adminJsOptions } from './src/adminJs/admin-options';
import { ApiRoutes } from './src/routes/api.routes';
import { WebsiteRoutes } from './src/routes/website.routes'
import { PrismaClient } from '@prisma/client';

AdminJS.registerAdapter({
  Resource: AdminJSPrisma.Resource,
  Database: AdminJSPrisma.Database,
})

const prismaClient = new PrismaClient();


const DEFAULT_ADMIN = { email: 'admin@example.com', password: 'password' }
const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
}

const start = async () => {

  const app = express()
  app.use(express.json());
  app.use(express.static(`${process.cwd()}/src/website/public`))
  app.use('/', WebsiteRoutes);
  app.use('/api/', ApiRoutes);
  
    
  const ConnectSession = Connect(session)
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: 'postgres://postgres:@localhost:5432/car_dealer',
      ssl: process.env.NODE_ENV === 'production',
    },
    tableName: 'session',
    createTableIfMissing: true,
  })

  const admin = new AdminJS(adminJsOptions(prismaClient))
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret',
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: 'sessionsecret',
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      },
      name: 'adminjs',
    }
  )
  app.use(admin.options.rootPath, adminRouter)

  const PORT = 3000
  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()
