import { OrderItem, OrderItemProperties } from '@/domain/entities'

const makeSut = (
  {
    id,
    itemId,
    quantity,
    price
  }: OrderItemProperties
): OrderItem => {
  return new OrderItem({
    id,
    itemId,
    quantity,
    price
  })
}

describe('Order Item entity', () => {
  let orderItem: OrderItem

  beforeEach(() => {
    orderItem = makeSut({
      id: '1',
      itemId: '2',
      price: 100,
      quantity: 2
    })
  })

  test('should create a order item', () => {
    expect(orderItem).toBeDefined()
  })

  test('should calculate total price', () => {
    const totalPrice = orderItem.getTotalPrice()

    expect(totalPrice).toBe(200)
  })
})
