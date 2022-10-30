import { Coordinates, DistanceCalculator, DistanceCalculatorProps } from '@/domain/entities'

const makeSut = (props?: Partial<DistanceCalculatorProps>): DistanceCalculator => new DistanceCalculator({
  origin: new Coordinates({
    latitude: -5.81,
    longitude: -36.59,
    ...props?.origin
  }),
  destination: new Coordinates({
    latitude: -23.5329,
    longitude: -46.6395,
    ...props?.destination
  }),
  ...props
})

describe('DistanceCalculator', () => {
  it('should return 0 if the coordinates equals', () => {
    const commonCoordinates = new Coordinates({
      latitude: -5.81,
      longitude: -36.59
    })
    const sut = makeSut({
      origin: commonCoordinates,
      destination: commonCoordinates
    })

    expect(sut.calculate()).toBe(0)
  })

  it('should return distance in kilometers if the coordinates not equals', () => {
    const sut = makeSut()

    expect(sut.calculate()).toBe(2245.060226631455)
  })
})
