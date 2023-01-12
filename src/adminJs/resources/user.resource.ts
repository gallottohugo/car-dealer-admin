import { PrismaClient } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';
//import passwordsFeature from '@adminjs/passwords'
//import argon2 from 'argon2'
import { PageContext, ValidationError } from 'adminjs';
export const userResource = (dmmf: DMMFClass, client: PrismaClient) => {
  return {
    resource: { model: dmmf.modelMap.User, client: client },
    options: {
      locale: {
        language: 'es',
        translations: {
        },
      },
      actions: {
        list: {
          isAccessible: (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
        },
        show: {
          isAccessible: (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
        },
        edit: {
          isAccessible: (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
        },
        delete: {
          isAccessible: (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
        },
        bulkDelete: {
          isAccessible: (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
        },
        new: {
          isAccessible: (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
        },
        search: {
          isAccessible: (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
        }
      }
    },
  }
}


