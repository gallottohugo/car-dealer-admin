import { PrismaClient } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';
import { ServiceService } from '../../services/service.service';

export const serviceResource = (dmmf: DMMFClass, client: PrismaClient) => {
  return {
    resource: { model: dmmf.modelMap.Service, client: client },
    options: {
      navigation: { name: 'MENU' },
      listProperties: ['title', 'description'],
      newProperties: ['title', 'description'],
      editProperties: ['title', 'description'],
      showProperties: ['title', 'description'],
      filterProperties: ['title', 'description'],
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

            const resouceService = new ServiceService();
            const resource = await resouceService.create(newPayload)
            return { 
              record: { params: resource },
              redirectUrl: '/admin/resources/Service',
            }
          },
        },
      },
    },
  }
}
