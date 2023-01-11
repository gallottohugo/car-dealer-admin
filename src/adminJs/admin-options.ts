import { DMMFClass } from '@prisma/client/runtime'
import uploadFeature from '@adminjs/upload';
import { PrismaClient } from '@prisma/client';

export const adminJsOptions = (prismaClient: PrismaClient) => {
  // `_baseDmmf` contains necessary Model metadata but it is a private method
  // so it isn't included in prismaClientClient type
  const dmmf = ((prismaClient as any)._baseDmmf as DMMFClass)
  const adminOptions = {
    // We pass Publisher to `resources`
    resources: [{
      resource: { model: dmmf.modelMap.User, client: prismaClient },
      options: {
        locale: {
        translations: {
          
          }
        }
      },
    },
    {
      resource: { model: dmmf.modelMap.Dealer, client: prismaClient },
      options: {},
    },
    {
      resource: { model: dmmf.modelMap.Car, client: prismaClient },
      options: {},
    },
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
    {
      resource: { model: dmmf.modelMap.Image, client: prismaClient },
      options: {
        properties: {
          name: {
            type: 'string',
            isArray: false,
          },
          comment: {
            type: 'textarea',
            isSortable: false,
          },
        },
      },
      features: [
        uploadFeature({
          provider: { local: {
            bucket: 'public/files',
            opts: {
              baseUrl: '/files'
            },
          } },
          multiple: true,
          validation: { mimeTypes: ['image/png', 'application/pdf', 'audio/mpeg'] },
          properties: {
            key: 'mykey',
            file: undefined,
            filesToDelete: undefined,
            filePath: undefined,
            bucket: undefined,
            mimeType: undefined,
            size: undefined,
            filename: undefined
          }
        }),
      ],
    }],
  }
  return adminOptions;
}
