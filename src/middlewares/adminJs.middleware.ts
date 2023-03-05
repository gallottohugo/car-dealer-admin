import AdminJS, { setCurrentAdmin } from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import Connect from 'connect-pg-simple'
import session from 'express-session'
import { adminJsOptions } from '../adminJs/admin-options';
import { UserService } from '../services/user.service'
import argon2 from 'argon2'
import prisma from '../../prisma/prisma.client'

const DEFAULT_ADMIN = { email: process.env.ADMIN_USER, password: process.env.ADMIN_PASS, admin: true }
const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    setCurrentAdmin({ email: email, password: password, admin: true, dealerId: null })
    return Promise.resolve(DEFAULT_ADMIN)
  }

  const user = await new UserService().getByEmail(email);
  if (user && await argon2.verify(user.password, password)) {
    setCurrentAdmin({ email: email, password: password, admin: false})
    return Promise.resolve({ email: email, password: password, admin: user.admin, dealerId: user.dealerId })
  }

  return null
}

const adminJsSessionStore = () => {
  const ConnectSession = Connect(session)
  return new ConnectSession({
    conObject: {
      connectionString: process.env.DATABASE_URL, 
    },
    tableName: 'session',
    createTableIfMissing: true,
  })
}

export const adminJsAdmin = (): AdminJS => {
  const prismaClient = prisma;
  return new AdminJS(adminJsOptions(prismaClient))
}

export const adminJsAdminRouter = () => {
  return AdminJSExpress.buildAuthenticatedRouter(
    adminJsAdmin(),
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret',
    },
    null,
    {
      store: adminJsSessionStore(),
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
}
