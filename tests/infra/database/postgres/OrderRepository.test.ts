import { randomUUID } from 'crypto'

import { Order } from '@/domain/entities'
import { OrderRepository } from '@/domain/repositories'

import { DatabaseConnection, DatabaseConnectionAdapter, OrderRepositoryPostgres } from '@/infra/database'

import { createOrder, deleteOrder } from './queries'

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

    await deleteOrder(databaseConnection, createdOrderId)
  })

  test('should get a order by code', async () => {
    const orderId = randomUUID()
    const orderCode = 'valid_code'
    await createOrder(databaseConnection, orderId, { code: orderCode })

    const orderByCode = await orderRepository.getByCode(orderCode)

    expect(orderByCode).toBeDefined()
    expect(orderByCode).toHaveProperty('orderCode')
    expect(orderByCode.getOrderCode()).toBe(orderCode)

    await deleteOrder(databaseConnection, orderId)
  })
})
