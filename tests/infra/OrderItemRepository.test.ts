import { OrderItemRepositoryPostgres } from '@/infra/database'

type makeSutType = {
  orderItemRepository: OrderItemRepositoryPostgres
}

const makeSut = (): makeSutType => {
  const orderItemRepository = new OrderItemRepositoryPostgres()

  return {
    orderItemRepository
  }
}

describe('Postgres OrderItem Repository', () => {
  test('should create a order item repository', () => {
    const { orderItemRepository } = makeSut()

    expect(orderItemRepository).toBeDefined()
  })
})
