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
      }
    })

    if (!order) {
      throw new OrderNotFoundError({
        targetProperty: 'code',
        targetValue: code
      })
    }

    return new Order({
      buyerCPF: order.cpf,
      sequence: order.sequence,
      purchaseDate: order.issue_date
    })
  }
}
