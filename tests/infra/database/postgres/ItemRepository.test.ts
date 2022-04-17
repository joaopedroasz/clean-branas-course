import { randomUUID } from 'crypto'

import { Item } from '@/domain/entities'
import { ItemNotFoundError } from '@/domain/errors'

import { DatabaseConnectionAdapter, DatabaseConnection, ItemRepositoryPostgres } from '@/infra/database'

import { createItem, deleteItem } from './queries'

type makeSutType = {
  itemRepository: ItemRepositoryPostgres
  databaseConnection: DatabaseConnection
}

const makeSut = (): makeSutType => {
  const databaseConnection = new DatabaseConnectionAdapter()
  const itemRepository = new ItemRepositoryPostgres(databaseConnection)
  return {
    itemRepository,
    databaseConnection
  }
}

describe('Postgres Item Repository', () => {
  const { itemRepository, databaseConnection } = makeSut()

  test('should create a ItemRepository', () => {
    expect(itemRepository).toBeDefined()
  })

  test('should get an Item', async () => {
    const itemId = randomUUID()
    await createItem(databaseConnection, itemId)

    const item = await itemRepository.getById(itemId)

    expect(item).toBeDefined()
    expect(item.getId()).toBe(itemId)

    await deleteItem(databaseConnection, itemId)
  })

  test('should throw a error when Item is not found', async () => {
    const invalidId = randomUUID()

    const invalidFunction = async (): Promise<Item> => await itemRepository.getById(invalidId)

    await expect(
      invalidFunction
    ).rejects.toThrowError(new ItemNotFoundError(invalidId))
  })
})
