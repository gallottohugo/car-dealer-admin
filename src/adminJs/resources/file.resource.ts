import { PrismaClient } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';
import uploadFeature from '@adminjs/upload';

// TODO: Fix
// require('dotenv').config()

export const fileResource = (dmmf: DMMFClass, client: PrismaClient) => {
  let dealerId = 0;
  return {
    resource: { model: dmmf.modelMap.File, client: client },
    options: {
      navigation: { name: 'MENU' },
      editProperties: ['file'],
      actions: {
        new: {
          before: async (request: any, context: any) => {
            dealerId = context.currentAdmin?.dealerId;
            return request;
          },
        },
      },
    },
    features: [
      uploadFeature({
        provider: {
          aws: {
            accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
            region: process.env.AWS_S3_REGIN || '',
            bucket: process.env.AWS_S3_BUCKET || '',
            // expires: 0,
          },
        },
        properties: { file: 'file', key: 's3Key', bucket: 'car-dealer-images', mimeType: 'mime', filePath: '5' },
        uploadPath: (record, filename) => {
          // /Users/gallottohugo/Workspaces/combination-enterprise/car-dealer/car-dealer-admin/node_modules/@adminjs/upload/types/features/upload-file/upload-file.feature.d.ts

          let { resource, params } = record;
          console.log('1 - *******************+')
          console.log(resource.properties())
          console.log('2 - *******************+')
          console.log(params)
          console.log('*******************+')
          
          return `dealer_${dealerId}/${record.id()}/${params.id}`
        },
        //multiple: true
        //validation: { mimeTypes: ['*'] },
      }),
    ],
  }
}

