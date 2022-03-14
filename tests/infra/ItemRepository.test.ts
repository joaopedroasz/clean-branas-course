import { randomUUID } from 'crypto'

import { Item } from '@/domain/entities'
import { ItemNotFoundError } from '@/domain/errors'

import { DatabaseConnectionAdapter, DatabaseConnection, ItemRepositoryPostgres } from '@/infra/database'

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
    await databaseConnection.query<object, null>(
      `
        INSERT INTO itens (
          id,
          category,
          description,
          price,
          height,
          width,
          depth,
          weight
        )
        VALUES (
          $<id>,
          $<category>,
          $<description>,
          $<price>,
          $<height>,
          $<width>,
          $<depth>,
          $<weight>
        );
      `,
      {
        id: itemId,
        category: 'Livros',
        description: 'Clean Code',
        price: 100.00,
        height: 15.00,
        width: 10,
        depth: 4.00,
        weight: 1
      }
    )

    const item = await itemRepository.getById(itemId)

    expect(item).toBeDefined()
    expect(item.id).toBe(itemId)

    await databaseConnection.query<object, null>(
      `
        DELETE FROM itens
        WHERE id = $<id>
      `,
      {
        id: itemId
      }
    )
  })

  test('should throw a error when Item is not found', async () => {
    const invalidId = randomUUID()

    const invalidFunction = async (): Promise<Item> => await itemRepository.getById(invalidId)

    await expect(
      invalidFunction
    ).rejects.toThrowError(new ItemNotFoundError(invalidId))
  })
})
