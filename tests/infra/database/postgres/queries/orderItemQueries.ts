import { randomUUID } from 'crypto'

import { DatabaseConnection } from '@/infra/database'

export async function createOrderItem (
  databaseConnection: DatabaseConnection,
  orderItemId?: string,
  orderId?: string,
  itemId?: string
): Promise<void> {
  await databaseConnection.query<object, undefined>(
    `
      INSERT INTO orders_items (
        id,
        item_id,
        order_id,
        items_quantity,
        price
      )
      VALUES (
        $<id>,
        $<item_id>,
        $<order_id>,
        1,
        1
      )
    `,
    {
      id: orderItemId ?? randomUUID(),
      item_id: itemId ?? randomUUID(),
      order_id: orderId ?? randomUUID()
    }
  )
}

export async function deleteOrderItem (databaseConnection: DatabaseConnection, orderItemId: string): Promise<void> {
  await databaseConnection.query<object, undefined>(
    `
      DELETE FROM orders_items
      WHERE id = $<id>
    `,
    {
      id: orderItemId
    }
  )
}
