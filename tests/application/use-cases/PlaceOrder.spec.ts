import { PlaceOrder } from '@/application/use-cases'
import { PlaceOrderInput } from '@/application/DTO/PlaceOrder'
import { ItemRepository } from '@/domain/repositories'
import { ItemRepositoryStub } from '@/tests/stub/repositories'

type makeSutTypes = {
  placeOrder: PlaceOrder
  itemRepository: ItemRepository
}

const makeSut = (): makeSutTypes => {
  const itemRepository = new ItemRepositoryStub()
  const placeOrder = new PlaceOrder(itemRepository)
  return {
    placeOrder,
    itemRepository
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

    expect(total).toBe(300)
  })
})
