import { PrismaClient } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';
import { CarService } from '../../services/car.service';

export const carResource = (dmmf: DMMFClass, client: PrismaClient) => {
  return {
    resource: { model: dmmf.modelMap.Car, client: client },
    options: {
      listProperties: ['name', 'license'],
      newProperties: ['name', 'license'],
      editProperties: ['name', 'license'],
      showProperties: ['name', 'license'],
      filterProperties: ['name', 'license'],
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

            const resouceService = new CarService();
            const resource = await resouceService.create(newPayload)
            return { 
              record: { params: resource },
              redirectUrl: '/admin/resources/Car',
            }
          },
        },
      },
    },
  }
}
