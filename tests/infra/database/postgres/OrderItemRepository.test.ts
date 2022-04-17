import { randomUUID } from 'crypto'

import { OrderItem } from '@/domain/entities'

import { DatabaseConnection, DatabaseConnectionAdapter, OrderItemRepositoryPostgres } from '@/infra/database'

import { createItem, createOrder, deleteItem, deleteOrder, deleteOrderItem } from './queries'

type makeSutType = {
  databaseConnection: DatabaseConnection
  orderItemRepository: OrderItemRepositoryPostgres
}

const makeSut = (): makeSutType => {
  const databaseConnection = new DatabaseConnectionAdapter()
  const orderItemRepository = new OrderItemRepositoryPostgres(databaseConnection)

  return {
    databaseConnection,
    orderItemRepository
  }
}

describe('Postgres OrderItem Repository', () => {
  const { databaseConnection, orderItemRepository } = makeSut()

  test('should create a order item repository', () => {
    expect(orderItemRepository).toBeDefined()
  })

  test('should save a order item in database', async () => {
    const orderId = randomUUID()
    const itemId = randomUUID()
    const orderItem = new OrderItem({ itemId, price: 1, quantity: 1 })

    await Promise.all([
      createItem(databaseConnection, itemId),
      createOrder(databaseConnection, orderId)
    ])

    const { createdOrderItemId } = await orderItemRepository.save({ orderId, orderItem })

    expect(createdOrderItemId).toBeDefined()

    await Promise.all([
      deleteOrderItem(databaseConnection, createdOrderItemId),
      deleteItem(databaseConnection, itemId),
      deleteOrder(databaseConnection, orderId)
    ])
  })
})
