import { Order, OrderCode } from '@/domain/entities'
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
    const orderCodeEntity = new OrderCode()
    orderCodeEntity.generate()
    const orderCode = orderCodeEntity.getCode()

    const { orderCode: code } = await orderRepository.save({ order, orderCode })

    expect(code).toBeDefined()

    await databaseConnection.query<object, null>(
      `
        DELETE FROM orders
        WHERE code = $<code>
      `,
      {
        code
      }
    )
  })
})
