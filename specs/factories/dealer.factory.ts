import { Dealer } from "@prisma/client"
import prisma from "../../prisma/prisma.client"

export async function createDealer(dealer?: Partial<Dealer>): Promise<Dealer> {
  return await prisma.dealer.create({
    data: {
      ...{
        id: 2,
        name: 'Dealer Name',
        apiKey: 'apikey',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      ...dealer
    },
  })
}
