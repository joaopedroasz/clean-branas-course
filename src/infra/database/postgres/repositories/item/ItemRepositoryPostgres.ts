import { Item } from '@/domain/entities'
import { ItemRepository } from '@/domain/repositories'
import { ItemNotFoundError } from '@/domain/errors'

import { DatabaseConnection, ItemTable } from '@/infra/database'

export class ItemRepositoryPostgres implements ItemRepository {
  private readonly databaseConnection: DatabaseConnection

  constructor (databaseConnection: DatabaseConnection) {
    this.databaseConnection = databaseConnection
  }

  public async getById (id: string): Promise<Item> {
    const [itemData] = await this.databaseConnection.query<string[], ItemTable[]>(
      'SELECT * FROM itens where id = $1',
      [id]
    )

    if (!itemData) throw new ItemNotFoundError(id)

    const item = new Item({
      id: itemData.id,
      category: itemData.category,
      description: itemData.description,
      price: itemData.price,
      heightInCM: itemData.height,
      widthInCM: itemData.width,
      depthInCM: itemData.depth,
      weightInCM: itemData.weight
    })

    return item
  }
}
