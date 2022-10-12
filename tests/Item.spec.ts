import { Item, ItemProps } from '@/Item'
import { InvalidPriceError } from '@/InvalidPrice'

const makeSut = (props: Partial<ItemProps>): Item => new Item({
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

  const negativeDimensions = [
    { name: 'heightInCm', value: -1 },
    { name: 'widthInCm', value: -1 },
    { name: 'depthInCm', value: -1 },
    { name: 'weightInKg', value: -1 }
  ]

  it.each(negativeDimensions)('should not create an Item with negative $name', ({ name, value }) => {
    const sut = (): Item => makeSut({ [name]: value })

    expect(sut).toThrowError(new Error('Invalid dimension'))
  })
})
