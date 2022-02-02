import { OrderItem } from '@/order-item'

const makeSut = (
  id: string,
  itemId: string,
  quantity: number,
  price: number
): OrderItem => {
  return new OrderItem(id, itemId, quantity, price)
}

describe('Order Item entity', () => {
  test('should create a order item', () => {
    const orderItem = makeSut('11', '12', 2, 100)

    expect(orderItem).toBeDefined()
  })
})
