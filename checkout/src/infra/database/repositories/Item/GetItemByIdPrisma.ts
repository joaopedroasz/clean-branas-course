import { PrismaClient } from '@prisma/client'

import { Item } from '@/domain/entities'
import { ItemNotFoundError } from '@/domain/errors'
import { GetItemByIdRepository } from '@/domain/repositories/Item'

export class GetItemByIdPrismaRepository implements GetItemByIdRepository {
  private readonly connection: PrismaClient

  constructor (connection: PrismaClient) {
    this.connection = connection
  }

  async getById (id: string): Promise<Item> {
    const item = await this.connection.item.findUnique({
      where: {
        id
      }
    })

    if (!item) {
      throw new ItemNotFoundError({
        targetProperty: 'id',
        targetValue: id
      })
    }

    return new Item({
      id: item.id,
      description: item.description,
      depthInCm: item.depth,
      heightInCm: item.height,
      price: item.price,
      weightInKg: item.weight,
      widthInCm: item.width,
      density: item.density,
      volumeInCubicMeter: item.volume
    })
  }
}
