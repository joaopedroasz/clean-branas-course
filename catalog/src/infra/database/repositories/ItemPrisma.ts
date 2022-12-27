import { PrismaClient } from '@prisma/client'

import { Item } from '@/domain/entities'
import { ItemRepository } from '@/domain/repositories/Item'

export class ItemPrismaRepository implements ItemRepository {
  private readonly prisma: PrismaClient

  constructor (prisma: PrismaClient) {
    this.prisma = prisma
  }

  public async getByIds (ids: string[]): Promise<Item[]> {
    const items = await this.prisma.item.findMany({
      where: {
        id: {
          in: ids
        }
      }
    })

    return items.map(item => new Item({
      description: item.description,
      depthInCm: item.depth,
      heightInCm: item.height,
      price: item.price,
      weightInKg: item.weight,
      widthInCm: item.width,
      id: item.id
    }))
  }

  public async save (item: Item): Promise<void> {
    await this.prisma.item.create({
      data: {
        description: item.getDescription(),
        depth: item.getDepth(),
        height: item.getHeight(),
        price: item.getPrice(),
        weight: item.getWeight(),
        width: item.getWidth()
      }
    })
  }
}
