import { FreightCalculator, FreightCalculatorProps, Item, ItemProps } from '@/domain/entities'
import { InvalidDistanceError, InvalidQuantityError } from '@/domain/errors'

const makeSut = (props: FreightCalculatorProps): FreightCalculator => new FreightCalculator(props)
const makeItem = (props?: Partial<ItemProps>): Item => new Item({
  id: 'any_id',
  description: 'Fridge',
  price: 10,
  heightInCm: 200,
  depthInCm: 50,
  weightInKg: 40,
  widthInCm: 100,
  ...props
})

describe('Freight Calculator', () => {
  it('should calculate freight by item and quantity', () => {
    const item = makeItem()
    const quantity = 2
    const sut = makeSut({
      item,
      quantity,
      distanceInKm: 1000
    })

    const freight = sut.calculate()

    expect(freight).toBe(800)
  })

  it('should return 10 as minimum freight', () => {
    const weightInKg = 1
    const heightInCm = 20
    const widthInCm = 15
    const depthInCm = 10
    const item = makeItem({ weightInKg, heightInCm, widthInCm, depthInCm })
    const sut = makeSut({ quantity: 1, item, distanceInKm: 1000 })

    const freight = sut.calculate()

    expect(freight).toBe(10)
  })

  it('should not calculate freight with negative quantity', () => {
    const item = makeItem()
    const quantity = -1
    const sut = (): FreightCalculator => makeSut({ quantity, item, distanceInKm: 1000 })

    expect(sut).toThrowError(new InvalidQuantityError(quantity))
  })

  it('should throw InvalidDistanceError if distance is negative', () => {
    const item = makeItem()
    const distanceInKm = -1
    const sut = (): FreightCalculator => makeSut({ distanceInKm, item, quantity: 1 })

    expect(sut).toThrowError(new InvalidDistanceError(distanceInKm))
  })
})
