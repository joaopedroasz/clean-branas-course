import { Coordinates, CoordinatesProps } from '@/domain/entities'
import { InvalidLatitudeError, InvalidLongitudeError } from '@/domain/errors'

const makeSut = (props?: Partial<CoordinatesProps>): Coordinates => new Coordinates({
  latitude: -5.81,
  longitude: -36.59,
  ...props
})

describe('Coordinates Entity', () => {
  it('should create valid instance', () => {
    const sut = makeSut({
      latitude: 10,
      longitude: 10
    })

    expect(sut).toBeDefined()
  })

  it('should throw InvalidLatitudeError if latitude is greater than 90', () => {
    const invalidLatitude = 91
    const error = (): Coordinates => makeSut({ latitude: invalidLatitude })

    expect(error).toThrowError(new InvalidLatitudeError(invalidLatitude))
  })

  it('should throw InvalidLatitudeError if latitude is less than -90', () => {
    const invalidLatitude = -91
    const error = (): Coordinates => makeSut({ latitude: invalidLatitude })

    expect(error).toThrowError(new InvalidLatitudeError(invalidLatitude))
  })

  it('should create valid instance if latitude is equal to 90', () => {
    const sut = makeSut({ latitude: 90 })

    expect(sut).toBeDefined()
  })

  it('should create valid instance if latitude is equal to -90', () => {
    const sut = makeSut({ latitude: -90 })

    expect(sut).toBeDefined()
  })

  it('should throw InvalidLongitudeError if longitude greater than 180', () => {
    const invalidLongitude = 181
    const error = (): Coordinates => makeSut({ longitude: invalidLongitude })

    expect(error).toThrowError(new InvalidLongitudeError(invalidLongitude))
  })
})
