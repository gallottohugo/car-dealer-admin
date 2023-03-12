import loggerFeature from '@adminjs/logger';
import { PrismaClient } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';


export const loggerResource = (dmmf: DMMFClass, client: PrismaClient) => {
  return {
    resource: { model: dmmf.modelMap.File, client: client },
    options: {
      navigation: { name: 'MENU' },
      actions: {
        list: {
          isAccessible: async (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
        },
        show: {
          isAccessible: async (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
        },
        edit: {
          isAccessible: async (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
        },
        delete: {
          isAccessible: async (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
        },
        bulkDelete: {
          isAccessible: async (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
        },
        new: {
          isAccessible: async (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
        },
        search: {
          isAccessible: async (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
        }
      }
    },
    features: [
      loggerFeature({
        propertiesMapping: { user: 'userId' },
        userIdAttribute: 'id',
      }),
    ],
    featureOptions: {
      propertiesMapping: {
        recordTitle: 'title' //field to store logged record's title
      },
      userIdAttribute: 'id', //primary key currently logged user
      resourceOptions: {
        navigation: {
          name: 'SectionName',
          icon: 'iconName'
        }
      }
    }
  }
}
