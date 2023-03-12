import { PrismaClient } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';

export const carPropertyResource = (dmmf: DMMFClass, client: PrismaClient) => {
  return {
    resource: { model: dmmf.modelMap.CarProperty, client: client },
    options: {
      navigation: { name: 'MENU' },
      actions: {
        //show: { }
        delete: {
          after: async (request: any, response: any, context: any) => {
            return {
              record: request.record,
              redirectUrl: `/admin/resources/Car/records/${request.record.params.car}/show`,
            }
          }
        },
        bulkDelete: {
          isAccessible: (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
        },
        list: {
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
