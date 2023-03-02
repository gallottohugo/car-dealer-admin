import { PrismaClient } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';
import { CarRepository } from '../../repositories/car.respository';
import { CarService } from '../../services/car.service';
import { Components } from '../components/components';

export const carResource = (dmmf: DMMFClass, client: PrismaClient) => {
  return {
    resource: { model: dmmf.modelMap.Car, client: client },
    options: {
      navigation: { name: 'MENU' },
      listProperties: ['name', 'license'],
      newProperties: ['name', 'license'],
      editProperties: ['name', 'license'],
      showProperties: ['name', 'license'],
      filterProperties: ['name', 'license'],
      actions: {
        show: {
          actionType: 'record',
          component: Components.CarShow,
          showResourceActions: true,
          handler: async (request: any, response: any, context: any) => {
            const { record, currentAdmin } = context
            const recordObject = await new CarRepository().find(record?.params.id)
            record.params = { ...record.params, ...recordObject }
            return {
              record: record.toJSON(currentAdmin)
            }
          },
        },
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
        carPropertyNew: {
          actionType: 'record',
          component: false,
          handler: (request: any, response: any, context:any) => {
            const { record, currentAdmin } = context;
            record.params = { carId: record.params.id }
            return {
              record: record.toJSON(currentAdmin),
              redirectUrl: `/admin/resources/CarProperty/actions/new`
            }
          },
        },
      },
    },
  }
}
