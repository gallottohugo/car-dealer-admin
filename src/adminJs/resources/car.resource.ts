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
      editProperties: ['name', 'license', 'description', 'details'],
      filterProperties: ['license'],
      listProperties: ['name', 'license'],
      actions: {
        show: {
          actionType: 'record',
          component: Components.CarShow,
          showResourceActions: true,
          handler: [ actionShowHandler ]
        },
        new: {
          before: [ actionNewBefore ],
          after: [ actionNewAfter ],
        },
        edit: {
          after: [ actionEditAfter ]
        }
      },
      properties: {
        description: {
          type: 'textarea'
        },
        details: {
          type: 'key-value',
        }, 
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

  const linceseUppercase = request.payload.license.toUpperCase()
  request.payload = {
    ...request.payload,
    ...{ 
      dealer: context.currentAdmin?.dealerId,
      license: linceseUppercase
    }
  }
  return request;
}

const actionNewAfter = async (request: any) => {
  await saveDetails(request.record.params)
  
  return { 
    record: { params: request.record },
    redirectUrl: '/admin/resources/Car',
  }
}

const actionEditAfter = async (request: any, response: any, context: any) => {
  const { currentAdmin, record } = context

  await saveDetails(record.params) 
  
  const recordObject = await new CarRepository().find(record.params.id)
  record.params = recordObject
  
  return {
    record: record.toJSON(currentAdmin),
    redirectUrl: `/admin/resources/Car/${record.params.id}`
  }
}


const saveDetails = async (params: any) => {
  //if (Object.keys(params.details).length === 0) return

  console.log(params)

  const keys = Object.keys(params)
  const carDetailsKeys = keys.filter((key) => key.startsWith('details.'));
  carDetailsKeys.forEach(async (property) => {
    await new CarPropertyRepository().create(new ICarProperty(
      property.replace('details.', ''),
      params[`${property}`],
      params.id,                
    ))
  })
}
