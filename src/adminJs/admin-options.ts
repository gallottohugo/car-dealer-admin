import { DMMFClass } from '@prisma/client/runtime'
import { PrismaClient } from '@prisma/client';
import { dealerResource } from './resources/dealer.resource';
import { imageResource } from './resources/image.resource';
import { userResource } from './resources/user.resource';
import { carResource } from './resources/car.resource';

export const adminJsOptions = (prismaClient: PrismaClient) => {
  // `_baseDmmf` contains necessary Model metadata but it is a private method
  // so it isn't included in prismaClientClient type
  const dmmf = ((prismaClient as any)._baseDmmf as DMMFClass)
  const adminOptions = {
    // We pass Publisher to `resources`
    resources: [
    userResource(dmmf, prismaClient),
    dealerResource(dmmf, prismaClient),
    carResource(dmmf, prismaClient),
    {
      resource: { model: dmmf.modelMap.CarProperty, client: prismaClient },
      options: {},
    },
    {
      resource: { model: dmmf.modelMap.Bucket, client: prismaClient },
      options: {},
    },
    {
      resource: { model: dmmf.modelMap.Service, client: prismaClient },
      options: {},
    },
    {
      resource: { model: dmmf.modelMap.Contact, client: prismaClient },
      options: {},
    },
    {
      resource: { model: dmmf.modelMap.AboutUs, client: prismaClient },
      options: {},
    },
    imageResource(dmmf, prismaClient),
    ],
  }
  return adminOptions;
}
