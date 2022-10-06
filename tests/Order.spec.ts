import { Order } from '@/Order'
import { InvalidCpfError } from '@/InvalidCPF'

describe('Order', () => {
  it('should not create an order with invalid CPF', () => {
    const invalidCPF = '705.738.222-72'
    const sut = (): Order => new Order({ buyerCPF: invalidCPF })

    expect(sut).toThrow(new InvalidCpfError(invalidCPF))
  })

  it('should create an order with valid CPF', () => {
    const validCPF = '705.738.222-71'
    const sut = new Order({ buyerCPF: validCPF })

    expect(sut).toBeDefined()
  })
})
