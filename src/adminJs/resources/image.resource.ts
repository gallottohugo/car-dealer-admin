import { PrismaClient } from '@prisma/client';
import { DMMFClass } from '@prisma/client/runtime';
import uploadFeature from '@adminjs/upload';

export const imageResource = (dmmf: DMMFClass, client: PrismaClient) => {
  return {
    resource: { model: dmmf.modelMap.Image, client: client },
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
  }
}
