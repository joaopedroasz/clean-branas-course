import { PrismaClient } from '@prisma/client'

import { Order } from '@/domain/entities'
import { GetOrdersByCPFRepository } from '@/domain/repositories/Order'

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
        order_items: true
      }
    })

    const formattedOrders: Order[] = []

    orders.forEach(order => {
      const formattedOrder = Order.build({
        buyerCPF: order.cpf,
        freight: order.freight ?? 0,
        orderItems: order.order_items.map(orderItem => ({ itemId: orderItem.item_id, quantity: orderItem.quantity, price: orderItem.price })),
        purchaseDate: order.issue_date,
        sequence: order.sequence,
        coupon: {
          code: order.coupon_code ?? undefined,
          percentage: order.coupon_percentage ?? undefined
        }
      })

      formattedOrders.push(formattedOrder)
    })

    return formattedOrders
  }
}
