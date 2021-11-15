import { OrderItem } from '@/order-item'

const makeSut = (id: string, itemId: string, quantity: number): OrderItem => {
  return new OrderItem(id, itemId, quantity)
}

describe('Order Item component', () => {
  test('should create a order item', () => {
    const orderItem = makeSut('11', '12', 2)

    expect(orderItem).toBeDefined()
  })
})
