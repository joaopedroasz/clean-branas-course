import { PrismaClient } from '@prisma/client'

import { OrderItem } from '@/domain/entities'
import { GetOrderItemsByOrderCodeRepository } from '@/domain/repositories/OrderItem'

export class GetOrderItemsByOrderCodePrismaRepository implements GetOrderItemsByOrderCodeRepository {
  private readonly connection: PrismaClient

  constructor (connection: PrismaClient) {
    this.connection = connection
  }

  public async getByOrderCode (orderCode: string): Promise<OrderItem[]> {
    const orderItems = await this.connection.orderItem.findMany({
      where: {
        order: {
          code: orderCode
        }
      }
    })

    return orderItems.map(orderItem => new OrderItem({
      itemId: orderItem.item_id,
      price: orderItem.price,
      quantity: orderItem.quantity
    }))
  }
}
