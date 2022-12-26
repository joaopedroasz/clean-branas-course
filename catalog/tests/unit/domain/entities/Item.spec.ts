import { Item, ItemProps } from '@/domain/entities'
import { InvalidPriceError, InvalidWeightError } from '@/domain/errors'

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

    expect(sut).toThrowError(new InvalidWeightError(invalidWeight))
  })

  it('should not create an item with weight equals to zero', () => {
    const invalidWeight = 0
    const sut = (): Item => makeSut({ weightInKg: invalidWeight })

    expect(sut).toThrowError(new InvalidWeightError(invalidWeight))
  })

  it('should calculate density', () => {
    const weightInKg = 1
    const heightInCm = 20
    const widthInCm = 15
    const depthInCm = 10
    const sut = makeSut({ weightInKg, heightInCm, widthInCm, depthInCm })

    const density = sut.calculateDensity()

    expect(density).toBe(333)
  })

  it('should return calculated volume', () => {
    const heightInCm = 20
    const widthInCm = 15
    const depthInCm = 10
    const sut = makeSut({ heightInCm, widthInCm, depthInCm })

    const volume = sut.calculateVolumeInCubicMeter()

    expect(volume).toBe(0.003)
  })

  it('should return description', () => {
    const description = 'any_description'
    const sut = makeSut({ description })

    expect(sut.getDescription()).toBe(description)
  })

  it('should return weight', () => {
    const weightInKg = 1
    const sut = makeSut({ weightInKg })

    expect(sut.getWeight()).toBe(weightInKg)
  })

  it('should return height', () => {
    const heightInCm = 1
    const sut = makeSut({ heightInCm })

    expect(sut.getHeight()).toBe(heightInCm)
  })

  it('should return width', () => {
    const widthInCm = 1
    const sut = makeSut({ widthInCm })

    expect(sut.getWidth()).toBe(widthInCm)
  })

  it('should return depth', () => {
    const depthInCm = 1
    const sut = makeSut({ depthInCm })

    expect(sut.getDepth()).toBe(depthInCm)
  })
})
