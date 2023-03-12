import loggerFeature from '@adminjs/logger';
import { PrismaClient } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';


export const loggerResource = (dmmf: DMMFClass, client: PrismaClient) => {
  return {
    resource: { model: dmmf.modelMap.File, client: client },
    options: {
      navigation: { name: 'MENU' },
    },
    features: [
      loggerFeature({
        propertiesMapping: {
          user: 'userId',
        },
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

