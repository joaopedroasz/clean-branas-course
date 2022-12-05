import { PrismaClient } from '@prisma/client'

import { StockEntry } from '@/domain/models'
import { SaveStockEntryRepository } from '@/domain/repositories'
import { SaveStockEntryPrismaRepository } from '@/infra/database'
import { connection } from '@/tests/utils'

type SutType = {
  sut: SaveStockEntryRepository
  connection: PrismaClient
}

const makeSut = (): SutType => ({
  sut: new SaveStockEntryPrismaRepository(connection),
  connection
})

describe('SaveStockEntryPrismaRepository', () => {
  it('should save a stock entry', async () => {
    const { sut, connection } = makeSut()

    const stockEntry = await sut.save(new StockEntry({
      itemId: 'any_id',
      operation: 'add',
      quantity: 1
    }))

    const createdStockEntry = await connection.stockEntry.findUnique({
      where: {
        id: stockEntry.getId()
      }
    })

    expect(createdStockEntry?.id).toBe(stockEntry.getId())
  })
})
