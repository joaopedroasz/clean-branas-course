import { PrismaClient } from '@prisma/client'

import { StockEntry } from '@/domain/models'
import { GetStockEntriesByItemIdRepository } from '@/domain/repositories'

export class GetStockEntriesByItemIdPrismaRepository implements GetStockEntriesByItemIdRepository {
  private readonly connection: PrismaClient

  constructor (connection: PrismaClient) {
    this.connection = connection
  }

  public async getByItemId (itemId: string): Promise<StockEntry[]> {
    const stockEntries = await this.connection.stockEntry.findMany({
      where: {
        itemId
      }
    })

    return stockEntries.map(stockEntry => new StockEntry({
      id: stockEntry.id,
      itemId: stockEntry.itemId,
      operation: stockEntry.operation,
      quantity: stockEntry.quantity
    }))
  }
}
