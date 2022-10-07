import { OrderItem } from '@/OrderItem'
import { Item } from '@/Item'

describe('OrderItem', () => {
  it('should create an order item with item and quantity', () => {
    const item = new Item({ description: 'T-Shirt', price: 10 })
    const sut = new OrderItem({ item, quantity: 2 })

    expect(sut).toBeDefined()
  })

  it('should calculate price of order item', () => {
    const item = new Item({ description: 'T-Shirt', price: 10 })
    const sut = new OrderItem({ item, quantity: 2 })

    expect(sut.calculatePrice()).toBe(20)
  })
})
