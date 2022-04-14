import { randomUUID } from 'crypto'

import { OrderItemRepository } from '@/domain/repositories/order-item'
import { SaveOrderItemInput, SaveOrderItemOutput } from '@/domain/repositories/order-item/types'

export class OrderItemRepositoryStub implements OrderItemRepository {
  public async save (input: SaveOrderItemInput): Promise<SaveOrderItemOutput> {
    return {
      createdOrderItemId: randomUUID()
    }
  }
}
