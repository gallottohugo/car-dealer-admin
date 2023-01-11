import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import Connect from 'connect-pg-simple'
import session from 'express-session'
import * as AdminJSPrisma from '@adminjs/prisma'
import { adminJsOptions } from './src/adminJs/admin-options';
import { ApiRoutes } from './src/routes/api.routes';
import { WebsiteRoutes } from './src/routes/website.routes'
import { PrismaClient } from '@prisma/client';
import { pinoMiddleware } from './src/config/logger'
import { UserService } from './src/services/user.service'

AdminJS.registerAdapter({
  Resource: AdminJSPrisma.Resource,
  Database: AdminJSPrisma.Database,
})

const prismaClient = new PrismaClient();

const DEFAULT_ADMIN = { email: process.env.ADMIN_USER, password: process.env.ADMIN_PASS }
const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }

  const userService = new UserService();
  const user = await userService.login(email, password);
  if (user) {
    return Promise.resolve({ email: email, password: password })
  }

  return null
}

const start = async () => {

  const app = express()
  app.use(express.json());
  app.use(express.static(`${process.cwd()}/website/build`))
  app.use(express.static(`${process.cwd()}/src/website/public`))
  app.use('/', WebsiteRoutes);
  app.use('/api/', ApiRoutes);


  app.use(pinoMiddleware);
  const ConnectSession = Connect(session)
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: process.env.DATABASE_URL, 
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


  app.listen(process.env.PORT, () => {
    console.log(`AdminJS started on http://localhost:${process.env.PORT}${admin.options.rootPath}`)
  })
}

start()
