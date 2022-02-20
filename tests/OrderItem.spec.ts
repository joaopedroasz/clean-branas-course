import { OrderItem } from '@/OrderItem'

const makeSut = (
  itemId: string,
  quantity: number,
  price: number,
  id?: string
): OrderItem => {
  return new OrderItem(itemId, quantity, price, id)
}

describe('Order Item entity', () => {
  let orderItem: OrderItem

  beforeEach(() => {
    orderItem = makeSut('12', 2, 100, '11')
  })

  test('should create a order item', () => {
    expect(orderItem).toBeDefined()
  })

  test('should calculate total price', () => {
    const totalPrice = orderItem.getTotalPrice()

    expect(totalPrice).toBe(200)
  })
})
