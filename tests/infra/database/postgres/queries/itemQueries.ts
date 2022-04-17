import { randomUUID } from 'crypto'

import { DatabaseConnection } from '@/infra/database'

export async function createItem (databaseConnection: DatabaseConnection, itemId?: string): Promise<void> {
  await databaseConnection.query<object, undefined>(
    `
      INSERT INTO items (
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
        'categoria padrão',
        'descrição padrão',
        1,
        1,
        1,
        1,
        1
      )
    `,
    {
      id: itemId ?? randomUUID()
    }
  )
}

export async function deleteItem (databaseConnection: DatabaseConnection, itemId: string): Promise<void> {
  await databaseConnection.query<object, undefined>(
    `
      DELETE FROM items
      WHERE id = $<id>
    `,
    {
      id: itemId
    }
  )
}
