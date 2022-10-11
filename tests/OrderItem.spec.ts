import { OrderItem, OrderItemProps } from '@/OrderItem'
import { Item } from '@/Item'
import { InvalidQuantityError } from '@/InvalidQuantity'

const makeSut = (props: OrderItemProps): OrderItem => new OrderItem(props)

describe('OrderItem', () => {
  let sut: OrderItem
  let item: Item

  beforeEach(() => {
    item = new Item({
      id: 'any_id',
      description: 'any_description',
      price: 10
    })
    sut = makeSut({ item, quantity: 1 })
  })

  it('should create an order item with item and quantity', () => {
    expect(sut).toBeDefined()
  })

  it('should calculate price of order item', () => {
    const sut = makeSut({ item, quantity: 2 })

    expect(sut.calculatePrice()).toBe(20)
  })

  it('should not create an order item with negative quantity', () => {
    const invalidQuantity = -1
    const errorSut = (): OrderItem => makeSut({ item, quantity: invalidQuantity })

    expect(errorSut).toThrowError(new InvalidQuantityError(invalidQuantity))
  })

  it('should not create an order item with zero quantity', () => {
    const invalidQuantity = 0
    const errorSut = (): OrderItem => makeSut({ item, quantity: invalidQuantity })

    expect(errorSut).toThrowError(new InvalidQuantityError(invalidQuantity))
  })
})
