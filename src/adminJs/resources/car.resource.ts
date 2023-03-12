import { PrismaClient, CarProperty } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';
import { CarRepository } from '../../repositories/car.respository';
import { Components } from '../components/components';
import { CarPropertyRepository } from '../../repositories/car-property.repository';
import { ICarProperty } from '../../interfaces/car-property.interface';

export const carResource = (dmmf: DMMFClass, client: PrismaClient) => {
  return {
    resource: { model: dmmf.modelMap.Car, client: client },
    options: {
      navigation: { name: 'MENU' },
      newProperties: ['name', 'license',],
      editProperties: ['name', 'license', 'carProperties'],
      filterProperties: ['name', 'license'],
      showProperties: ['name', 'license'],
      listProperties: ['name', 'license'],
      actions: {
        show: {
          actionType: 'record',
          component: Components.CarShow,
          showResourceActions: true,
          handler: [actionShowHandler]
        },
        new: {
          before: [actionNewBefore],
          after: [actionNewAfter],
        },
      },
      properties: {
        carProperties: {
          type: 'key-value',
        }
      }
    },
  }
}

const actionShowHandler = async (request: any, response: any, context: any) => {
  const { record, currentAdmin } = context
  const recordObject = await new CarRepository().find(record?.params.id)
  record.params = { ...record.params, ...recordObject }
  return {
    record: record.toJSON(currentAdmin)
  }
}

const actionNewBefore = async (request: any, context: any) => {
  request.payload = {
    ...request.payload,
    ...{ dealer:  context.currentAdmin?.dealerId }
  }
  return request;
}

const actionNewAfter = async (request: any, context: any) => {
  const keys = Object.keys(request.record.params)
  const carPropertyKeys = keys.filter((key) => key.startsWith('carProperties'));
  carPropertyKeys.forEach(async (property) => {
    await new CarPropertyRepository().create(new ICarProperty(
      property.replace('carProperties.', ''),
      request.record.params[`${property}`],
      +request.record.params.id,                
    ))
  })
  
  return { 
    record: { params: request.record },
    redirectUrl: '/admin/resources/Car',
  }
}
