import { Order } from '@/domain/entities'
import { OrderRepository } from '@/domain/repositories'

export class OrderRepositoryStub implements OrderRepository {
  public async save (order: Order): Promise<{ createdOrderId: string }> {
    return {
      createdOrderId: '1'
    }
  }
}
