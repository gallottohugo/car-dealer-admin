import { PrismaClient } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';
import argon2 from 'argon2'

export const userResource = (dmmf: DMMFClass, client: PrismaClient) => {
  return {
    resource: { model: dmmf.modelMap.User, client: client },
    options: {
      navigation: { name: 'MENU' },
      locale: {
        language: 'es',
        translations: {
        },
      },
      actions: {
        list: {
          isAccessible: (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
          after: [listCustomAfter]
        },
        show: {
          isAccessible: (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
          after: [showCustomAfter],
        },
        edit: {
          isAccessible: (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
          before: [editCustomBefore],
          after: [editCustomAfter]
        },
        delete: {
          isAccessible: (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
        },
        bulkDelete: {
          isAccessible: (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
        },
        new: {
          isAccessible: (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
          before: [newCustomBefore],
          after: [newCustomAfter]
        },
        search: {
          isAccessible: (context: any) => {
            const { currentAdmin } = context
            return currentAdmin.admin
          },
        }
      }
    },
  }
}

const listCustomAfter = async (response: any) => {
  response.records.forEach((record: any) => {
    record.params.password = '';
  });
  return response;
}

const editCustomBefore = async (request: any) => {
  if (request.method === 'post') {
    if (request.payload?.password) {
      request.payload.password = await argon2.hash(request.payload.password);
    } else {
      delete request.payload?.password;
    }
  }
  return request;
}

const editCustomAfter = async (response: any) => {
  response.record.params.password = '';
  return response;
}

const showCustomAfter = async (response: any) => {
  response.record.params.password = '';
  return response;
}

const newCustomBefore = async (request: any, context: any) => {
  if (request.payload?.password) {
    request.payload.password = await argon2.hash(request.payload.password);
  }
  return request;
}

const newCustomAfter = (originalResponse: any, request: any, context: any) => {
  console.log(originalResponse)
  
  return originalResponse
}
