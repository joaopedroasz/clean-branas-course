import { Item } from '@/item'
import { InvalidPriceError } from '@/InvalidPrice'

describe('Item', () => {
  it('should create an item with description and price', () => {
    const sut = new Item({ description: 'any_description', price: 1 })

    expect(sut).toBeDefined()
  })

  it('should not create an item with invalid price', () => {
    const invalidPrice = -1
    const sut = (): Item => new Item({ description: 'any_description', price: invalidPrice })

    expect(sut).toThrow(new InvalidPriceError(invalidPrice))
  })

  it('should return price', () => {
    const sut = new Item({ description: 'any_description', price: 1 })

    expect(sut.getPrice()).toBe(1)
  })
})
