import { OrderItem } from '@/order-item'

const makeSut = (
  itemId: string,
  quantity: number,
  price: number,
  id?: string
): OrderItem => {
  return new OrderItem(itemId, quantity, price, id)
}

describe('Order Item entity', () => {
  test('should create a order item', () => {
    const orderItem = makeSut('12', 2, 100, '11')

    expect(orderItem).toBeDefined()
  })
})
