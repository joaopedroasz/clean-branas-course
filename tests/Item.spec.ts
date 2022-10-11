import { Item, ItemProps } from '@/Item'
import { InvalidPriceError } from '@/InvalidPrice'

const makeSut = (props: ItemProps): Item => new Item(props)

describe('Item', () => {
  let sut: Item

  beforeEach(() => {
    sut = makeSut({
      id: 'any_id',
      description: 'any_description',
      price: 10,
      heightInCm: 10,
      widthInCm: 10,
      depthInCm: 10,
      weightInKg: 10
    })
  })

  it('should create an item with description and price', () => {
    expect(sut).toBeDefined()
  })

  it('should not create an item with invalid price', () => {
    const invalidPrice = -1
    const sut = (): Item => makeSut({
      id: 'any_id',
      description: 'any_description',
      price: invalidPrice,
      heightInCm: 10,
      widthInCm: 10,
      depthInCm: 10,
      weightInKg: 10
    })

    expect(sut).toThrow(new InvalidPriceError(invalidPrice))
  })

  it('should not create an item with price equals to zero', () => {
    const invalidPrice = 0
    const sut = (): Item => makeSut({
      id: 'any_id',
      description: 'any_description',
      price: invalidPrice,
      heightInCm: 10,
      widthInCm: 10,
      depthInCm: 10,
      weightInKg: 10
    })

    expect(sut).toThrow(new InvalidPriceError(invalidPrice))
  })

  it('should return price', () => {
    expect(sut.getPrice()).toBe(10)
  })

  it('should return id', () => {
    expect(sut.getId()).toBe('any_id')
  })
})
