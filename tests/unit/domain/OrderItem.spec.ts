import { OrderItem, OrderItemProps } from '@/domain/entities'
import { InvalidQuantityError } from '@/domain/errors'

const makeSut = (props: OrderItemProps): OrderItem => new OrderItem(props)

describe('OrderItem', () => {
  it('should create an order item with item and quantity', () => {
    const sut = makeSut({
      itemId: 'any_item_id',
      price: 10,
      quantity: 2
    })

    expect(sut).toBeDefined()
  })

  it('should calculate price of order item', () => {
    const sut = makeSut({ itemId: 'any_id', price: 10, quantity: 2 })

    expect(sut.calculatePrice()).toBe(20)
  })

  it('should not create an order item with negative quantity', () => {
    const invalidQuantity = -1
    const errorSut = (): OrderItem => makeSut({ itemId: 'any_id', price: 10, quantity: invalidQuantity })

    expect(errorSut).toThrowError(new InvalidQuantityError(invalidQuantity))
  })

  it('should not create an order item with zero quantity', () => {
    const invalidQuantity = 0
    const errorSut = (): OrderItem => makeSut({ itemId: 'any_id', price: 10, quantity: invalidQuantity })

    expect(errorSut).toThrowError(new InvalidQuantityError(invalidQuantity))
  })

  it('should return item', () => {
    const itemId = 'any_id'
    const sut = makeSut({
      itemId,
      price: 10,
      quantity: 2
    })

    expect(sut.getItemId()).toEqual(itemId)
  })
})
