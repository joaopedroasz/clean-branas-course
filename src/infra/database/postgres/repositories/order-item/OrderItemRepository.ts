import { OrderItemRepository, SaveOrderItemInput, SaveOrderItemOutput } from '@/domain/repositories'

import { DatabaseConnection } from '@/infra/database'
import { SaveOrderItemQueryInput, SaveOrderItemQueryOutput } from './types'

export class OrderItemRepositoryPostgres implements OrderItemRepository {
  private readonly databaseConnection: DatabaseConnection

  constructor (databaseConnection: DatabaseConnection) {
    this.databaseConnection = databaseConnection
  }

  public async save (input: SaveOrderItemInput): Promise<SaveOrderItemOutput> {
    const [createdOrderItemId] = await this.databaseConnection.query<
    SaveOrderItemQueryInput, SaveOrderItemQueryOutput[]
    >(
      `
        INSERT INTO orders_items (
          item_id,
          order_id,
          items_quantity,
          price
        )
        VALUES (
          $<item_id>,
          $<order_id>,
          $<items_quantity>,
          $<price>
        )
        RETURNING id;
      `,
      {
        item_id: input.orderItem.getItemId(),
        items_quantity: input.orderItem.getQuantity(),
        order_id: input.orderId,
        price: input.orderItem.getTotalPrice()
      }
    )

    const { id } = createdOrderItemId

    return {
      createdOrderItemId: id
    }
  }
}
