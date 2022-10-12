import { Item, ItemProps } from '@/Item'
import { InvalidPriceError } from '@/InvalidPrice'

const makeSut = (props?: Partial<ItemProps>): Item => new Item({
  id: 'any_id',
  description: 'any_description',
  price: 1,
  depthInCm: 1,
  heightInCm: 1,
  weightInKg: 1,
  widthInCm: 1,
  ...props
})

describe('Item', () => {
  it('should create an item with description and price', () => {
    const sut = makeSut()

    expect(sut).toBeDefined()
  })

  it('should not create an item with invalid price', () => {
    const invalidPrice = -1
    const sut = (): Item => makeSut({ price: invalidPrice })

    expect(sut).toThrow(new InvalidPriceError(invalidPrice))
  })

  it('should not create an item with price equals to zero', () => {
    const invalidPrice = 0
    const sut = (): Item => makeSut({ price: invalidPrice })

    expect(sut).toThrow(new InvalidPriceError(invalidPrice))
  })

  it('should return price', () => {
    const price = 10
    const sut = makeSut({ price })

    expect(sut.getPrice()).toBe(price)
  })

  it('should return id', () => {
    const id = 'any_id'
    const sut = makeSut({ id })

    expect(sut.getId()).toBe(id)
  })

  it('should not create an item with negative weight', () => {
    const invalidWeight = -1
    const sut = (): Item => makeSut({ weightInKg: invalidWeight })

    expect(sut).toThrowError(new Error('Invalid weight'))
  })
})
