import { Dealer } from "@prisma/client"
import prisma from "../../prisma/prisma.client"

export async function createDealer(): Promise<Dealer> {
  return await prisma.dealer.create({
    data: {
      name: 'Dealer Name',
      apiKey: 'apikey',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  })
}
