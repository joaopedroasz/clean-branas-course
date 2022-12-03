import { PrismaClient } from '@prisma/client'

import { Order } from '@/domain/entities'
import { GetOrderByCodeRepository } from '@/domain/repositories/Order'
import { OrderNotFoundError } from '@/domain/errors'

export class GetOrderByCodePrismaRepository implements GetOrderByCodeRepository {
  constructor (private readonly connection: PrismaClient) {}

  public async getByCode (code: string): Promise<Order> {
    const order = await this.connection.order.findUnique({
      where: {
        code
      },
      include: {
        order_items: true
      }
    })

    if (!order) {
      throw new OrderNotFoundError({
        targetProperty: 'code',
        targetValue: code
      })
    }

    const {
      sequence,
      order_items: orderItems,
      cpf,
      freight,
      issue_date: issueDate,
      coupon_code: couponCode,
      coupon_percentage: couponPercentage
    } = order

    return Order.build({
      buyerCPF: cpf,
      freight: freight ?? 0,
      orderItems: orderItems.map(({ quantity, price, item_id: itemId }) => ({ quantity, price, itemId })),
      purchaseDate: issueDate,
      sequence,
      coupon: {
        code: couponCode ?? undefined,
        percentage: couponPercentage ?? undefined
      }
    })
  }
}
