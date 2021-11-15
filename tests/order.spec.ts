import { Order } from '@/order'

const makeSut = (id: string, orderItemId: string, cpf: string): Order => {
  return new Order(id, orderItemId, cpf)
}

describe('Order component', () => {
  test('should create a order', () => {
    const order = makeSut('123', '222', '518.858.724-61')

    expect(order).toBeDefined()
  })

  test('should throw a Error when cpf is invalid', () => {
    expect(() => makeSut('11', '111', '222.222.222-22')).toThrowError('Invalid CPF')
  })
})
