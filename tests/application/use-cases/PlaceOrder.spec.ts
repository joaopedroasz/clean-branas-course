import { PlaceOrder } from '@/application/use-cases'

const makeSut = (): PlaceOrder => {
  return new PlaceOrder()
}

describe('Place Order use case', () => {
  test('should create a place order', () => {
    const placeOrder = makeSut()

    expect(placeOrder).toBeDefined()
  })
})
