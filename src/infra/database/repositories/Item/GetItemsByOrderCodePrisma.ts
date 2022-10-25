import { PrismaClient } from '@prisma/client'

import { Item } from '@/domain/entities'
import { GetItemsByOrderCodeRepository } from '@/domain/repositories/Item'

export class GetItemsByOrderCodePrismaRepository implements GetItemsByOrderCodeRepository {
  private readonly connection: PrismaClient

  constructor (connection: PrismaClient) {
    this.connection = connection
  }

  public async getByOrderCode (orderCode: string): Promise<Item[]> {
    const items = await this.connection.item.findMany({
      where: {
        order_items: {
          some: {
            order: {
              code: orderCode
            }
          }
        }
      }
    })

    return items.map(item => new Item({
      id: item.id,
      depthInCm: item.depth,
      description: item.description,
      heightInCm: item.height,
      price: item.price,
      weightInKg: item.weight,
      widthInCm: item.width
    }))
  }
}
