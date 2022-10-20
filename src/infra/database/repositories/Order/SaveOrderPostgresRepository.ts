import { PrismaClient } from '@prisma/client'

import { Order } from '@/domain/entities'
import { SaveOrderRepository } from '@/domain/repositories/Order'

export class SaveOrderPostgresRepository implements SaveOrderRepository {
  private readonly connection: PrismaClient

  constructor (connection: PrismaClient) {
    this.connection = connection
  }

  public async save (order: Order): Promise<Order> {
    const createdOrder = await this.connection.order.create({
      data: {
        cpf: order.getCPF(),
        code: order.getCode(),
        total: order.getTotalPrice(),
        coupon_code: order.getCouponCode(),
        issue_date: order.getPurchaseDate(),
        freight: order.getFreightPrice(),
        OrderItem: {
          createMany: {
            data: order.getOrderItems().map(orderItem => ({
              item_id: orderItem.getItemId(),
              quantity: orderItem.getQuantity(),
              price: orderItem.calculatePrice()
            }))
          }
        }
      },
      include: {
        coupon: true,
        OrderItem: {
          include: {
            item: true
          }
        }
      }
    })

    return new Order({
      buyerCPF: createdOrder.cpf,
      purchaseDate: createdOrder.issue_date,
      sequence: createdOrder.sequence
    })
  }
}
