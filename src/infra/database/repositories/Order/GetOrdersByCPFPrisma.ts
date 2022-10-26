import { PrismaClient } from '@prisma/client'

import { GetOrdersByCPFRepository } from '@/domain/repositories/Order'
import { Order } from '@/domain/entities'

export class GetOrdersByCPFPrismaRepository implements GetOrdersByCPFRepository {
  private readonly connection: PrismaClient

  constructor (connection: PrismaClient) {
    this.connection = connection
  }

  public async getByCPF (CPF: string): Promise<Order[]> {
    const orders = await this.connection.order.findMany({
      where: {
        cpf: CPF
      }
    })

    return orders.map(order => new Order({
      buyerCPF: order.cpf,
      sequence: order.sequence,
      purchaseDate: order.issue_date
    }))
  }
}
