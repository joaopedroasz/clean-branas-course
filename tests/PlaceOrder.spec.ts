import { PlaceOrder } from '@/PlaceOrder'
import { PlaceOrderInputDTO } from '@/PlaceOrderInput'
import { PlaceOrderUseCase } from '@/PlaceOrderUseCase'

type SutType = {
  sut: PlaceOrder
}

const makeSut = (): SutType => {
  const sut = new PlaceOrderUseCase()
  return {
    sut
  }
}

describe('PlaceOrder use case', () => {
  it('should return total value from placed order', async () => {
    const input: PlaceOrderInputDTO = {
      buyerCPF: '607.109.010-54',
      orderItems: [
        { itemId: 'any_id', quantity: 1 },
        { itemId: 'other_id', quantity: 2 }
      ]
    }
    const { sut } = makeSut()

    const result = await sut.execute(input)

    expect(result.order).toEqual(100)
    expect(result.total).toBe(100)
  })
})
