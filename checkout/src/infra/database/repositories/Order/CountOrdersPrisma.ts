import { PrismaClient } from '@prisma/client'

import { CountOrdersRepository } from '@/domain/repositories/Order'

export class CountOrdersPrismaRepository implements CountOrdersRepository {
  private readonly connection: PrismaClient

  constructor (connection: PrismaClient) {
    this.connection = connection
  }

  async count (): Promise<number> {
    return await this.connection.order.count()
  }
}
