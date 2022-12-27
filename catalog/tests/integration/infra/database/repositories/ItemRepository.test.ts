import { PrismaClient } from '@prisma/client'

import { Item } from '@/domain/entities'
import { ItemRepository } from '@/domain/repositories/Item'
import { ItemPrismaRepository } from '@/infra/database'
import { connection, deleteAll } from '@/tests/utils'
import { makeItem } from '@/tests/doubles'

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

  describe('get items by ids', () => {
    it('should return an array of items', async () => {
      const { sut } = makeSut()
      const item = makeItem()
      await sut.save(item)
      const createdItem = await connection.item.create({
        data: {
          description: item.getDescription(),
          depth: item.getDepth(),
          height: item.getHeight(),
          price: item.getPrice(),
          weight: item.getWeight(),
          width: item.getWidth()
        }
      })

      const items = await sut.getByIds([createdItem.id])

      expect(items).toHaveLength(1)
      expect(items[0]).toBeInstanceOf(Item)
    })

    it('should return an empty array if no items are found', async () => {
      const { sut } = makeSut()

      const items = await sut.getByIds(['invalid-id'])

      expect(items).toHaveLength(0)
    })
  })
})
