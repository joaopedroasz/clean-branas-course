import { PrismaClient } from '@prisma/client'

import { GetItemByIdRepository } from '@/domain/repositories/Item'
import { ItemNotFoundError } from '@/domain/errors'
import { GetItemByIdPostgresRepository } from '@/infra/database'

type SutTypes = {
  sut: GetItemByIdRepository
  connection: PrismaClient
}

const connection = new PrismaClient()
const makeSut = (): SutTypes => {
  const sut = new GetItemByIdPostgresRepository(connection)
  return {
    sut,
    connection
  }
}

describe('GetItemByIdPostgresRepository', () => {
  afterAll(async () => {
    const { connection } = makeSut()
    const deleteItems = connection.item.deleteMany()
    const deleteOrderItems = connection.orderItem.deleteMany()
    await connection.$transaction([deleteItems, deleteOrderItems])
    await connection.$disconnect()
  })

  it('should return an item by id', async () => {
    const { sut, connection } = makeSut()
    const { id: createdItemId } = await connection.item.create({
      data: {
        description: 'any_description',
        price: 10,
        depth: 1,
        height: 1,
        weight: 1,
        width: 1
      }
    })

    const item = await sut.getById(createdItemId)

    expect(item).toBeTruthy()
  })

  it('should throw ItemNotFoundError if item does not exist', async () => {
    const { sut } = makeSut()

    const error = sut.getById('invalid_id')

    await expect(error).rejects.toThrowError(new ItemNotFoundError({
      targetProperty: 'id',
      targetValue: 'invalid_id'
    }))
  })
})
