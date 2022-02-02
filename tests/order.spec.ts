import { Order } from '@/order'

const makeSut = (
  cpf: string,
  id?: string
): Order => {
  return new Order(cpf, id)
}

describe('Order entity', () => {
  test('should create a order', () => {
    const order = makeSut('518.858.724-61','123')

    expect(order).toBeDefined()
  })

  test('should not create a Order when CPF is invalid', () => {
    const invalidCPF = '222.222.222-22'

    expect(() => makeSut(invalidCPF, '11')).toThrowError('Invalid CPF')
  })
})
