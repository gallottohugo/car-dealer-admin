import { PrismaClient } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';

export const dealerResource = (dmmf: DMMFClass, client: PrismaClient) => {
  return {
    resource: { model: dmmf.modelMap.Dealer, client: client},
    options: {
      navigation: { name: 'MENU' },
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
