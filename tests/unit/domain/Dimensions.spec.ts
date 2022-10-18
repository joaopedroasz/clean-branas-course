import { Dimensions, DimensionsProps } from '@/domain/entities'
import { InvalidDimensionError } from '@/domain/errors'

const makeSut = (props?: Partial<DimensionsProps>): Dimensions => new Dimensions({
  heightInCm: 1,
  widthInCm: 1,
  depthInCm: 1,
  ...props
})

describe('Dimensions', () => {
  it('should create a dimension with valid values', () => {
    const sut = makeSut({
      heightInCm: 10,
      widthInCm: 10,
      depthInCm: 10
    })

    expect(sut).toBeDefined()
  })

  const negativeDimensions = [
    { name: 'heightInCm', value: -1 },
    { name: 'widthInCm', value: -2 },
    { name: 'depthInCm', value: -3 }
  ]

  it.each(negativeDimensions)('should not create a Dimension with negative $name', ({ name, value }) => {
    const sut = (): Dimensions => makeSut({ [name]: value })

    expect(sut).toThrowError(new InvalidDimensionError({ propertyName: name, value }))
  })

  const zeroDimensions = [
    { name: 'heightInCm', value: 0 },
    { name: 'widthInCm', value: 0 },
    { name: 'depthInCm', value: 0 }
  ]

  it.each(zeroDimensions)('should not create a Dimension with zero $name', ({ name, value }) => {
    const sut = (): Dimensions => makeSut({ [name]: value })

    expect(sut).toThrowError(new InvalidDimensionError({ propertyName: name, value }))
  })

  it('should return volume in cubic meter', () => {
    const sut = makeSut({
      heightInCm: 20,
      widthInCm: 15,
      depthInCm: 10
    })

    expect(sut.calculateVolumeInCubicMeter()).toBe(0.003)
  })
})
