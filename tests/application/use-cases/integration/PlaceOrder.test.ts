import { CouponRepository, ItemRepository, OrderItemRepository, OrderRepository } from '@/domain/repositories'
import { Item } from '@/domain/entities'
import { CouponNotFoundError, ItemNotFoundError } from '@/domain/errors'

import { PlaceOrderUseCase } from '@/application/contracts'
import { PlaceOrder } from '@/application/use-cases'
import { PlaceOrderInput, PlaceOrderOutput } from '@/application/dtos'

import { CouponRepositoryPostgres, DatabaseConnection, DatabaseConnectionAdapter, ItemRepositoryPostgres, OrderItemRepositoryPostgres, OrderRepositoryPostgres } from '@/infra/database'

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
  const { placeOrder, itemRepository, couponRepository } = makeSut()

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
    ],
    couponId: '1'
  }

  test('should throw an error when itemRepository throws an error', async () => {
    const invalidId = 'invalid_id'
    const itemNotFoundError = new ItemNotFoundError(invalidId)
    jest.spyOn(itemRepository, 'getById').mockImplementationOnce(() => {
      throw itemNotFoundError
    })

    const placeOrderError = async (): Promise<PlaceOrderOutput> => await placeOrder.execute(placeOrderInput)

    await expect(placeOrderError).rejects.toThrowError(itemNotFoundError)
  })

  test('should throw an error when couponRepository throws an error', async () => {
    const invalidId = 'invalid_id'
    const couponNotFoundError = new CouponNotFoundError(invalidId)
    jest.spyOn(itemRepository, 'getById').mockImplementation(async () => {
      return Promise.resolve(new Item({ id: '1', category: '', depthInCM: 0, description: '', heightInCM: 0, price: 0, weightInCM: 0, widthInCM: 0 }))
    })
    jest.spyOn(couponRepository, 'getById').mockImplementationOnce(() => {
      throw couponNotFoundError
    })

    const placeOrderError = async (): Promise<PlaceOrderOutput> => await placeOrder.execute(placeOrderInput)

    await expect(placeOrderError).rejects.toThrowError(couponNotFoundError)
  })
})
