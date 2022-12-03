import { PrismaClient } from '@prisma/client'

import { Order } from '@/domain/entities'
import { SaveOrderRepository } from '@/domain/repositories/Order'

export class SaveOrderPrismaRepository implements SaveOrderRepository {
  private readonly connection: PrismaClient

  constructor (connection: PrismaClient) {
    this.connection = connection
  }

  public async save (order: Order): Promise<Order> {
    const {
      cpf,
      issue_date: issueDate,
      sequence,
      order_items: orderItems,
      freight,
      coupon_code: couponCode,
      coupon_percentage: couponPercentage
    } = await this.connection.order.create({
      data: {
        cpf: order.getCPF(),
        code: order.getCode(),
        total: order.getTotalPrice(),
        coupon_code: order.getCouponCode(),
        issue_date: order.getPurchaseDate(),
        freight: order.getFreight(),
        order_items: {
          createMany: {
            data: order.getOrderItems().map(orderItem => ({
              item_id: orderItem.getItemId(),
              quantity: orderItem.getQuantity(),
              price: orderItem.calculatePrice()
            }))
          }
        },
        coupon_percentage: order.getCouponPercentage()
      },
      include: {
        order_items: true
      }
    })

    return Order.build({
      buyerCPF: cpf,
      freight: freight ?? 0,
      orderItems: orderItems.map(orderItem => ({ itemId: orderItem.item_id, quantity: orderItem.quantity, price: orderItem.price })),
      purchaseDate: issueDate,
      sequence,
      coupon: {
        code: couponCode ?? undefined,
        percentage: couponPercentage ?? undefined
      }
    })
  }
}
