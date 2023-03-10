import { PrismaClient } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';
import uploadFeature from '@adminjs/upload';

// TODO: Fix 
require('dotenv').config()

export const fileResource = (dmmf: DMMFClass, client: PrismaClient) => {
  let dealerId = 0;
  return {
    resource: { model: dmmf.modelMap.File, client: client },
    options: {
      navigation: { name: 'MENU' },
      actions: {
        new: {
          before: async (request: any, context: any) => {
            dealerId = context.currentAdmin?.dealerId
            return request;
          },
        },
      },
      properties: {
        s3Key: {
          type: 'string',
        },
        bucket: {
          type: 'string',
        },
        mime: {
          type: 'string',
        }
      },
    },
    features: [
      uploadFeature(
        {
          provider: {
            aws: {
              accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
              region: process.env.AWS_S3_REGIN || '',
              bucket: process.env.AWS_S3_BUCKET || '',
            },
          },
          properties: { file: 'file', key: 's3Key', bucket: 'car-dealer-images', mimeType: 'mime', filePath: '5' },
          uploadPath: (record, filename) => {
            return `dealer_${dealerId}/${record.id()}_${filename}`
          }
          //validation: { mimeTypes: ['*'] },
          //multiple: true
        }
      ),
    ],
  }
}

