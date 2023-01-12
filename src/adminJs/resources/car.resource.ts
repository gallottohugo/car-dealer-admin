import { PrismaClient } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';
import { ValidationError } from 'adminjs';

export const carResource = (dmmf: DMMFClass, client: PrismaClient) => {
  return {
    resource: { model: dmmf.modelMap.Car, client: client },
    options: {
      actions: {
        edit: {
          before: [validateForm],
        },
      },
    },
  }
}


const validateForm = (request: any, context: any) => {
  const { payload = {}, method } = request
  
  // We only want to validate "post" requests
  if (method !== 'post') return request
  
  // Payload contains data sent from the frontend
  const { age = null, lastName = '' } = payload

  
  // We will store validation errors in an object, so that
  // we can throw multiple errors at the same time
  const errors = {}
  
  /* // We are doing validations and assigning errors to "errors" object
  if (!age || age < 18) {
    errors.age = {
      message: 'A user must be at least 18 years old',
    }
  } */
  
  /* if (lastName.trim().length === 0) {
    errors.lastName = {
      message: 'Last name is required',
    }
  } */
  
  // We throw AdminJS ValidationError if there are errors in the payload
  if (Object.keys(errors).length) {
    throw new ValidationError(errors)
  }
  
  return request
}
