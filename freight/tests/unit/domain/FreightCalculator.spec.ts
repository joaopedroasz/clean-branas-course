import { FreightCalculator, FreightCalculatorProps } from '@/domain/entities'
import { InvalidDistanceError, InvalidQuantityError } from '@/domain/errors'

const makeSut = (props?: Partial<FreightCalculatorProps>): FreightCalculator => new FreightCalculator({
  density: 100,
  distanceInKm: 100,
  quantity: 1,
  volume: 1,
  ...props
})

describe('Freight Calculator', () => {
  it('should calculate freight', () => {
    const sut = makeSut({
      density: 5,
      volume: 3,
      quantity: 1,
      distanceInKm: 1000
    })

    const freight = sut.calculate()

    expect(freight).toBe(150)
  })

  it('should return 10 as minimum freight', () => {
    const sut = makeSut({ quantity: 1, density: 10, volume: 5, distanceInKm: 1000 })

    const freight = sut.calculate()

    expect(freight).toBe(500)
  })

  it('should not calculate freight with negative quantity', () => {
    const quantity = -1
    const sut = (): FreightCalculator => makeSut({ quantity })

    expect(sut).toThrowError(new InvalidQuantityError(quantity))
  })

  it('should throw InvalidDistanceError if distance is negative', () => {
    const distanceInKm = -1
    const sut = (): FreightCalculator => makeSut({ distanceInKm })

    expect(sut).toThrowError(new InvalidDistanceError(distanceInKm))
  })
})
