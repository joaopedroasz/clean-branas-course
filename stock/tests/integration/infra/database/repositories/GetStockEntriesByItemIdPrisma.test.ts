import { PrismaClient } from '@prisma/client'

import { StockEntry } from '@/domain/models'
import { GetStockEntriesByItemIdRepository } from '@/domain/repositories'
import { GetStockEntriesByItemIdPrismaRepository, PrismaConnectionSingleton } from '@/infra/database'

type SutType = {
  sut: GetStockEntriesByItemIdRepository
  connection: PrismaClient
}

const makeSut = (): SutType => {
  const connection = PrismaConnectionSingleton.getInstance().getClient()
  const sut = new GetStockEntriesByItemIdPrismaRepository(connection)

  return {
    sut,
    connection
  }
}

describe('GetStockEntriesByItemIdPrismaRepository', () => {
  it('should return an array of stock entries', async () => {
    const { sut, connection } = makeSut()

    await connection.stockEntry.createMany({
      data: [
        {
          itemId: 'any_item_id',
          operation: 'add',
          quantity: 10
        },
        {
          itemId: 'any_item_id',
          operation: 'remove',
          quantity: 5
        }
      ]
    })

    const stockEntries = await sut.getByItemId('any_item_id')

    expect(stockEntries[0]).toBeInstanceOf(StockEntry)
    expect(stockEntries[1]).toBeInstanceOf(StockEntry)
  })

  it('should return an empty array if no stock entries are found', async () => {
    const { sut } = makeSut()

    const stockEntries = await sut.getByItemId('any_item_id_with_no_stock_entries')

    expect(stockEntries).toEqual([])
  })
})
