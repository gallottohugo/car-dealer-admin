import { PrismaClient } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';

export const carPropertyResource = (dmmf: DMMFClass, client: PrismaClient) => {
  return {
    resource: { model: dmmf.modelMap.CarProperty, client: client },
    options: {
      navigation: { name: 'MENU' },
      listProperties: ['property', 'value', 'car'],
      newProperties: ['property', 'value', 'car'],
      editProperties: ['property', 'value', 'car'],
      showProperties: ['property', 'value', 'car'],
      filterProperties: ['property', 'value', 'car'],
      actions: {},
    },
  }
}
