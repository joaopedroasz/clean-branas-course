import { Order } from '@/domain/entities'
import { OrderRepository } from '@/domain/repositories'
import { DatabaseConnection, DatabaseConnectionAdapter, OrderRepositoryPostgres } from '@/infra/database'

type makeSutTypes = {
  orderRepository: OrderRepository
  databaseConnection: DatabaseConnection
}

const makeSut = (): makeSutTypes => {
  const databaseConnection = new DatabaseConnectionAdapter()
  const orderRepository = new OrderRepositoryPostgres(databaseConnection)

  return {
    orderRepository,
    databaseConnection
  }
}

describe('Order Repository', () => {
  const { orderRepository, databaseConnection } = makeSut()

  test('should save a order in database', async () => {
    const order = new Order({ cpf: '728.261.520-92' })

    const { createdOrderId, createdOrderCode } = await orderRepository.save({ order })

    expect(createdOrderId).toBeDefined()
    expect(createdOrderCode).toBeDefined()

    await databaseConnection.query<object, null>(
      `
        DELETE FROM orders
        WHERE id = $<id>
      `,
      {
        id: createdOrderId
      }
    )
  })
})
