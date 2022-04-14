import { OrderItemRepository } from '@/domain/repositories'
import { SaveOrderItemInput, SaveOrderItemOutput } from '@/domain/repositories/order-item'

export class OrderItemRepositoryPostgres implements OrderItemRepository {
  public async save (input: SaveOrderItemInput): Promise<SaveOrderItemOutput> {
    return await Promise.resolve({
      createdOrderItemId: ''
    })
  }
}
