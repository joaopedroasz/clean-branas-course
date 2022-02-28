import { randomUUID } from 'crypto'

import { ItemRepositoryPostgres } from '@/infra/repositories'
import { DatabaseConnectionAdapter } from '@/infra/database'

type makeSutType = {
  itemRepository: ItemRepositoryPostgres
  databaseConnection: DatabaseConnectionAdapter
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
})
