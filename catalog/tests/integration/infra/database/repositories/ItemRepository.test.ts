import { PrismaClient } from '@prisma/client'

import { ItemRepository } from '@/domain/repositories/Item'
import { connection, deleteAll } from '@/tests/utils'
import { makeItem } from '@/tests/doubles'
import { ItemPrismaRepository } from '@/infra/database'

type SutType = {
  sut: ItemRepository
  connection: PrismaClient
}

const makeSut = (): SutType => ({
  sut: new ItemPrismaRepository(connection),
  connection
})

describe('ItemRepository', () => {
  beforeAll(async () => {
    await deleteAll(connection)
  })

  describe('create item', () => {
    it('should create a new item', async () => {
      const { sut } = makeSut()
      const item = makeItem()

      await sut.save(item)

      const createdItem = await connection.item.findFirst()
      expect(createdItem).toBeTruthy()
    })
  })
})
