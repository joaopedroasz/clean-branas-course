import { Order } from '@/Order'
import { InvalidCpfError } from '@/InvalidCPF'
import { Item } from '@/Item'

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

  it('should add OrderItems into Order', () => {
    const validCPF = '705.738.222-71'
    const sut = new Order({ buyerCPF: validCPF })
    const item = new Item({ description: 'description', price: 10 })

    sut.addItem({ item, quantity: 1 })

    expect(sut.getOrderItems()).toHaveLength(1)
  })

  it('should create an order with three items', async () => {
    const validCPF = '705.738.222-71'
    const sut = new Order({ buyerCPF: validCPF })
    const item1 = new Item({ description: 'item 1', price: 10 })
    const item3 = new Item({ description: 'item 2', price: 10 })
    const item2 = new Item({ description: 'item 3', price: 10 })

    sut.addItem({ item: item1, quantity: 1 })
    sut.addItem({ item: item2, quantity: 1 })
    sut.addItem({ item: item3, quantity: 1 })

    expect(sut.getOrderItems()).toHaveLength(3)
  })
})
