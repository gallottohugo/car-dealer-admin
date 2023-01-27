import { PrismaClient } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';
import { CarService } from '../../services/car.service';
import { Components } from '../components/components';

export const carResource = (dmmf: DMMFClass, client: PrismaClient) => {
  return {
    resource: { model: dmmf.modelMap.Car, client: client },
    options: {
      navigation: { name: 'MENU', },
      listProperties: ['name', 'license'],
      newProperties: ['name', 'license'],
      editProperties: ['name', 'license'],
      showProperties: ['name', 'license'],
      filterProperties: ['name', 'license'],
      actions: {
        new: {
          handler: async (request: any, response: any, context: any) => {
            const newPayload = {
              ...request.payload,
              ...{ dealerId: context.currentAdmin?.dealerId }
            }

            const resource = await new CarService().create(newPayload)
            return { 
              record: { params: resource },
              redirectUrl: '/admin/resources/Car',
            }
          },
        },
        addCarDetail: {
          actionType: 'record',
          component: Components.MyCustomAction,
          handler: (request: any, response: any, context:any) => {
            const { record, currentAdmin } = context;
            return {
              record: record.toJSON(currentAdmin),
              msg: 'Hello world',
            }
          },
          // parent: 'More',
          // showInDrawer: true,
        },
      },
    },
  }
}
