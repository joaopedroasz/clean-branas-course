import { Item, ItemProps, OrderItem } from '@/domain/entities'
import { InvalidPriceError, InvalidWeightError } from '@/domain/errors'

const makeSut = (props?: Partial<ItemProps>): Item => new Item({
  id: 'any_id',
  description: 'any_description',
  price: 1,
  depthInCm: 1,
  heightInCm: 1,
  weightInKg: 1,
  widthInCm: 1,
  density: 1,
  volumeInCubicMeter: 1,
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
    const sut = makeSut({ density: 1 })

    const density = sut.getDensity()

    expect(density).toBe(1)
  })

  it('should return calculated volume', () => {
    const sut = makeSut({ volumeInCubicMeter: 0.003 })

    const volume = sut.getVolume()

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

  it('should create an instance of OrderItem', () => {
    const sut = makeSut()

    const orderItem = sut.createOrderItem(1)

    expect(orderItem).toBeDefined()
    expect(orderItem).toBeInstanceOf(OrderItem)
  })
})
