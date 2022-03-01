import { Order } from '@/domain/entities'
import { OrderRepository, SaveResponse } from '@/domain/repositories'

export class OrderRepositoryStub implements OrderRepository {
  public async save (order: Order): Promise<SaveResponse> {
    return {
      createdOrderId: '1'
    }
  }
}
