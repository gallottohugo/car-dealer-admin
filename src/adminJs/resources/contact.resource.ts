import { PrismaClient, Contact } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';
import { ContactService } from '../../services/contact.service';

export const contactResource = (dmmf: DMMFClass, client: PrismaClient) => {
  return {
    resource: { model: dmmf.modelMap.Contact, client: client },
    options: {
      listProperties: ['phone', 'address'],
      newProperties: ['phone', 'address'],
      editProperties: ['phone', 'address'],
      showProperties: ['phone', 'address'],
      filterProperties: ['phone', 'address'],
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

            const resouceService = new ContactService();
            const resource = await resouceService.create(newPayload)
            return { 
              record: { params: resource },
              redirectUrl: '/admin/resources/Contact',
            }
          },
        },
      },
    },
  }
}
