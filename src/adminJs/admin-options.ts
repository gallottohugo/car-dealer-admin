import { DMMFClass } from '@prisma/client/runtime'
import uploadFeature from '@adminjs/upload';
import { PrismaClient } from '@prisma/client'



export class AdminJSOptions {}

const prisma = new PrismaClient()


export const adminJsOptions = () => {
  // `_baseDmmf` contains necessary Model metadata but it is a private method
  // so it isn't included in PrismaClient type
  const dmmf = ((prisma as any)._baseDmmf as DMMFClass)
  const adminOptions = {
    // We pass Publisher to `resources`
    resources: [{
      resource: { model: dmmf.modelMap.User, client: prisma },
      options: {
        locale: {
        translations: {
          
        }
      }},
    },
    {
      resource: { model: dmmf.modelMap.Dealer, client: prisma },
      options: {},
    },
    {
      resource: { model: dmmf.modelMap.Car, client: prisma },
      options: {},
    },
    {
      resource: { model: dmmf.modelMap.CarProperty, client: prisma },
      options: {},
    },
    {
      resource: { model: dmmf.modelMap.Bucket, client: prisma },
      options: {},
    },
    {
      resource: { model: dmmf.modelMap.Service, client: prisma },
      options: {},
    },
    {
      resource: { model: dmmf.modelMap.Contact, client: prisma },
      options: {},
    },
    {
      resource: { model: dmmf.modelMap.AboutUs, client: prisma },
      options: {},
    },
    {
      resource: { model: dmmf.modelMap.Image, client: prisma },
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
