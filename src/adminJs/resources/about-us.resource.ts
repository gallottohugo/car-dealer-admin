import { PrismaClient, AboutUs } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';
import { AboutUsService } from '../../services/about-us.service';

export const aboutUsResource = (dmmf: DMMFClass, client: PrismaClient) => {
  return {
    resource: { model: dmmf.modelMap.AboutUs, client: client },
    options: {
      listProperties: ['description'],
      navigation: { name: 'MENU' },
      newProperties: ['description'],
      editProperties: ['description'],
      showProperties: ['description'],
      filterProperties: ['description'],
      actions: {
        new: {
          handler: async (request: any, response: any, context: any) => {
            const { currentAdmin } = context
            const { payload = {} } = request
            const newPayload = {
              ...payload,
              ...{
                dealerId: currentAdmin.dealerId,
              }
            }

            const resouceService = new AboutUsService();
            const resource = await resouceService.create(newPayload)
            return { 
              record: { params: resource },
              redirectUrl: '/admin/resources/AboutUs',
            }
          },
        },
      },
    },
  }
}
