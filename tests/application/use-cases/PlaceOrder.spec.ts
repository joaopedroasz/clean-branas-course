import { PlaceOrder } from '@/application/use-cases'
import { PlaceOrderInput } from '@/application/DTO/PlaceOrder'

const makeSut = (): PlaceOrder => {
  return new PlaceOrder()
}

describe('Place Order use case', () => {
  test('should create a place order', () => {
    const placeOrder = makeSut()

    expect(placeOrder).toBeDefined()
  })

  test('should execute place order use case', async () => {
    const placeOrderInput: PlaceOrderInput = {
      CPF: '237.967.084-63',
      orderItems: [
        {
          idItem: 1,
          quantity: 1
        },
        {
          idItem: 2,
          quantity: 2
        },
        {
          idItem: 3,
          quantity: 3
        }
      ]
    }
    const placeOrder = makeSut()
    const placeOrderSpy = jest.spyOn(placeOrder, 'execute')
    await placeOrder.execute(placeOrderInput)

    expect(placeOrderSpy).toHaveBeenCalled()
  })
})
