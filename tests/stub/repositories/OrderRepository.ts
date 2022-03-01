import { OrderRepository, SaveOrderInput, SaveOrderOutput } from '@/domain/repositories'

export class OrderRepositoryStub implements OrderRepository {
  public async save (input: SaveOrderInput): Promise<SaveOrderOutput> {
    return {
      orderCode: '202212345678'
    }
  }
}
