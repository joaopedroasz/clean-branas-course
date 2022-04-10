import { randomUUID } from 'crypto'

import { OrderRepository, SaveOrderInput, SaveOrderOutput } from '@/domain/repositories'

export class OrderRepositoryStub implements OrderRepository {
  public async save (input: SaveOrderInput): Promise<SaveOrderOutput> {
    return {
      createdOrderCode: '202212345678',
      createdOrderId: randomUUID()
    }
  }
}
