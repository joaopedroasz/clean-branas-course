import { PrismaClient } from '@prisma/client'

import { Item } from '@/domain/entities'
import { GetItemsByOrderCPFRepository } from '@/domain/repositories/Item'

export class GetItemsByOrderCPFPrismaRepository implements GetItemsByOrderCPFRepository {
  private readonly connection: PrismaClient

  constructor (connection: PrismaClient) {
    this.connection = connection
  }

  public async getByOrderCPF (CPF: string): Promise<Item[]> {
    const items = await this.connection.item.findMany({
      where: {
        order_items: {
          some: {
            order: {
              cpf: CPF
            }
          }
        }
      }
    })

    return items.map(item => new Item({
      id: item.id,
      description: item.description,
      price: item.price,
      depthInCm: item.depth,
      heightInCm: item.height,
      weightInKg: item.weight,
      widthInCm: item.width
    }))
  }
}
