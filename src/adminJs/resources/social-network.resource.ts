import { PrismaClient, SocialNetwork } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';
import { SocialNetworkService } from '../../services/social-network.service';


export const socialNetworkResource = (dmmf: DMMFClass, client: PrismaClient) => {
  return {
    resource: { model: dmmf.modelMap.SocialNetwork, client: client },
    options: {
      listProperties: ['name', 'url'],
      newProperties: ['name', 'url'],
      editProperties: ['name', 'url'],
      showProperties: ['name', 'url'],
      filterProperties: ['name', 'url'],
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

            const resouceService = new SocialNetworkService();
            const resource = await resouceService.create(newPayload)
            return { 
              record: { params: resource },
              redirectUrl: '/admin/resources/SocialNetwork',
            }
          },
        },
      },
    },
  }
}
