import { randomUUID } from 'crypto'

import { OrderRepository, SaveOrderInput, SaveOrderOutput } from '@/domain/repositories'
import { Order } from '@/domain/entities'

export class OrderRepositoryStub implements OrderRepository {
  public async save (input: SaveOrderInput): Promise<SaveOrderOutput> {
    return {
      createdOrderCode: '202212345678',
      createdOrderId: randomUUID()
    }
  }

  public async getByCode (code: string): Promise<Order> {
    return new Order({
      id: '',
      cpf: '497.893.270-05',
      freight: 0,
      issueDate: new Date('04/30/2022')
    })
  }
}
