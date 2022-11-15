import { PrismaClient } from '@prisma/client'

import { GetOrdersByCPFRepository } from '@/domain/repositories/Order'
import { Item, Order } from '@/domain/entities'

export class GetOrdersByCPFPrismaRepository implements GetOrdersByCPFRepository {
  private readonly connection: PrismaClient

  constructor (connection: PrismaClient) {
    this.connection = connection
  }

  public async getByCPF (CPF: string): Promise<Order[]> {
    const orders = await this.connection.order.findMany({
      where: {
        cpf: CPF
      },
      include: {
        order_items: {
          include: {
            item: true
          }
        }
      }
    })

    const formattedOrders: Order[] = []

    orders.forEach(order => {
      const formattedOrder = new Order({
        buyerCPF: order.cpf,
        purchaseDate: order.issue_date,
        sequence: order.sequence
      })

      order.order_items.forEach(orderItem => {
        const item = new Item({
          id: orderItem.item.id,
          description: orderItem.item.description,
          price: orderItem.item.price,
          depthInCm: orderItem.item.depth,
          heightInCm: orderItem.item.height,
          weightInKg: orderItem.item.weight,
          widthInCm: orderItem.item.width
        })

        formattedOrder.addItem({
          item,
          quantity: orderItem.quantity
        })
      })

      formattedOrders.push(formattedOrder)
    })

    return formattedOrders
  }
}
