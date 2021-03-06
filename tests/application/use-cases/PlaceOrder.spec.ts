import { ItemRepository, OrderRepository } from '@/domain/repositories'
import { PlaceOrder } from '@/application/use-cases'
import { PlaceOrderInput } from '@/application/dtos/place-order'

import { ItemRepositoryStub, OrderRepositoryStub } from '@/tests/stub/repositories'

type makeSutTypes = {
  placeOrder: PlaceOrder
  itemRepository: ItemRepository
  orderRepository: OrderRepository
}

const makeSut = (): makeSutTypes => {
  const itemRepository = new ItemRepositoryStub()
  const orderRepository = new OrderRepositoryStub()
  const placeOrder = new PlaceOrder(itemRepository, orderRepository)
  return {
    placeOrder,
    itemRepository,
    orderRepository
  }
}

describe('Place Order use case', () => {
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

  test('should create a place order', () => {
    const { placeOrder } = makeSut()

    expect(placeOrder).toBeDefined()
  })

  test('should execute place order use case', async () => {
    const { placeOrder } = makeSut()
    const placeOrderSpy = jest.spyOn(placeOrder, 'execute')
    await placeOrder.execute(placeOrderInput)

    expect(placeOrderSpy).toHaveBeenCalled()
  })

  test('should return order total price', async () => {
    const { placeOrder } = makeSut()
    const { total } = await placeOrder.execute(placeOrderInput)

    expect(total).toBe(600)
  })

  test('should return a code to placed order', async () => {
    const { placeOrder } = makeSut()
    const { orderCode } = await placeOrder.execute(placeOrderInput)

    expect(orderCode).toBeDefined()
    expect(orderCode.length).toBe(12)
  })

  test('should call itemRepository with the correct parameters', async () => {
    const { placeOrder, itemRepository } = makeSut()
    const itemRepositorySpy = jest.spyOn(itemRepository, 'getById')
    await placeOrder.execute(placeOrderInput)

    expect(itemRepositorySpy).toBeCalledTimes(3)
    expect(itemRepositorySpy).toBeCalledWith('1')
    expect(itemRepositorySpy).toBeCalledWith('2')
    expect(itemRepositorySpy).toBeCalledWith('3')
  })

  test('should call orderRepository with the correct parameters', async () => {
    const { placeOrder, orderRepository } = makeSut()
    const orderRepositorySpy = jest.spyOn(orderRepository, 'save')
    await placeOrder.execute(placeOrderInput)

    expect(orderRepositorySpy).toBeCalledTimes(1)
  })
})
