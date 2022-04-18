import { CouponRepository, ItemRepository, OrderItemRepository, OrderRepository } from '@/domain/repositories'

import { PlaceOrderUseCase } from '@/application/contracts'
import { PlaceOrder } from '@/application/use-cases'
import { PlaceOrderInput, PlaceOrderOutput } from '@/application/dtos'

import { CouponRepositoryPostgres, DatabaseConnection, DatabaseConnectionAdapter, ItemRepositoryPostgres, OrderItemRepositoryPostgres, OrderRepositoryPostgres } from '@/infra/database'
import { ItemNotFoundError } from '@/domain/errors'

type makeSutType = {
  placeOrder: PlaceOrderUseCase
  databaseConnection: DatabaseConnection
  itemRepository: ItemRepository
  orderRepository: OrderRepository
  couponRepository: CouponRepository
  orderItemRepository: OrderItemRepository
}

const makeSut = (): makeSutType => {
  const databaseConnection = new DatabaseConnectionAdapter()
  const itemRepository = new ItemRepositoryPostgres(databaseConnection)
  const orderRepository = new OrderRepositoryPostgres(databaseConnection)
  const couponRepository = new CouponRepositoryPostgres(databaseConnection)
  const orderItemRepository = new OrderItemRepositoryPostgres(databaseConnection)
  const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository, orderItemRepository)
  return {
    databaseConnection,
    itemRepository,
    orderRepository,
    couponRepository,
    orderItemRepository,
    placeOrder
  }
}

describe('Place Order use case', () => {
  const { placeOrder, itemRepository } = makeSut()

  const placeOrderInput: PlaceOrderInput = {
    CPF: '237.967.084-63',
    orderItems: [
      {
        idItem: '1',
        quantity: 1
      },
      {
        idItem: '2',
        quantity: 2
      },
      {
        idItem: '3',
        quantity: 3
      }
    ]
  }

  test('should throw an error when itemRepository throws an error', async () => {
    const invalidId = 'invalid_id'
    jest.spyOn(itemRepository, 'getById').mockImplementationOnce(() => {
      throw new ItemNotFoundError(invalidId)
    })

    const placeOrderError = async (): Promise<PlaceOrderOutput> => await placeOrder.execute(placeOrderInput)

    await expect(placeOrderError).rejects.toThrowError(new ItemNotFoundError(invalidId))
  })
})
