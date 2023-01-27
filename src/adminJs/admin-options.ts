import { DMMFClass } from '@prisma/client/runtime'
import { PrismaClient } from '@prisma/client';
import { dealerResource } from './resources/dealer.resource';
import { imageResource } from './resources/image.resource';
import { userResource } from './resources/user.resource';
import { carResource } from './resources/car.resource';
import { serviceResource } from './resources/service.resource';
import { aboutUsResource } from './resources/about-us.resource';
import { contactResource } from './resources/contact.resource';
import { socialNetworkResource } from './resources/social-network.resource';
import { fileResource } from './resources/file.resource';
import { esLocale } from './locales/es-locale';
import { componentLoader, Components } from './components/components';

export const adminJsOptions = (prismaClient: PrismaClient) => {
  const dmmf = ((prismaClient as any)._baseDmmf as DMMFClass)

  const adminOptions = {
    componentLoader: componentLoader,
    dashboard: { component: Components.MyDashboard },
    env: { /* Environmental variables passed to the frontend. Record<string, string> */ },
    locale: esLocale(),
    branding: { logo: '', companyName: '', withMadeWithLove: false },
    resources: [
      userResource(dmmf, prismaClient),
      dealerResource(dmmf, prismaClient),
      carResource(dmmf, prismaClient),
      {
        resource: { model: dmmf.modelMap.CarProperty, client: prismaClient },
        options: {
          navigation: { name: 'MENU' },
        },
      },
      serviceResource(dmmf, prismaClient),
      aboutUsResource(dmmf, prismaClient),
      contactResource(dmmf, prismaClient),
      socialNetworkResource(dmmf, prismaClient),
      fileResource(dmmf, prismaClient),
      imageResource(dmmf, prismaClient),
      {
        resource: { model: dmmf.modelMap.Bucket, client: prismaClient },
        options: {
          navigation: { name: 'MENU' },
        },
      },
    ],
  }
  return adminOptions;
}
