import { PrismaClient } from '@prisma/client'

import { StockEntry } from '@/domain/models'
import { SaveStockEntryRepository } from '@/domain/repositories'

export class SaveStockEntryPrismaRepository implements SaveStockEntryRepository {
  private readonly connection: PrismaClient

  constructor (connection: PrismaClient) {
    this.connection = connection
  }

  public async save (stockEntry: StockEntry): Promise<StockEntry> {
    const { itemId, operation, quantity, id } = await this.connection.stockEntry.create({
      data: {
        itemId: stockEntry.getItemId(),
        operation: stockEntry.getOperation(),
        quantity: stockEntry.getQuantity()
      }
    })

    return new StockEntry({ itemId, operation, quantity, id })
  }
}
