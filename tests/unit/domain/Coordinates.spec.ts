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

  it('should throw InvalidLongitudeError if longitude less than -180', () => {
    const invalidLongitude = -181
    const error = (): Coordinates => makeSut({ longitude: invalidLongitude })

    expect(error).toThrowError(new InvalidLongitudeError(invalidLongitude))
  })

  it('should create valid instance if longitude is equal to 180', () => {
    const sut = makeSut({ longitude: 180 })

    expect(sut).toBeDefined()
  })

  it('should create valid instance if longitude is equal to -180', () => {
    const sut = makeSut({ longitude: -180 })

    expect(sut).toBeDefined()
  })

  it('should return true if two instances have the same values', () => {
    const sut1 = makeSut()
    const sut2 = makeSut()

    expect(sut1.equals(sut2)).toBeTruthy()
  })

  it('should return false if two instances have different latitudes', () => {
    const sut1 = makeSut({ latitude: 10 })
    const sut2 = makeSut({ latitude: 20 })

    expect(sut1.equals(sut2)).toBeFalsy()
    expect(sut2.equals(sut1)).toBeFalsy()
  })

  it('should return false if two instances have different longitudes', () => {
    const sut1 = makeSut({ longitude: 10 })
    const sut2 = makeSut({ longitude: 20 })

    expect(sut1.equals(sut2)).toBeFalsy()
    expect(sut2.equals(sut1)).toBeFalsy()
  })

  it('should return false if two instances have different latitudes and longitudes', () => {
    const sut1 = makeSut({ latitude: 10, longitude: 11 })
    const sut2 = makeSut({ latitude: 20, longitude: 22 })

    expect(sut1.equals(sut2)).toBeFalsy()
    expect(sut2.equals(sut1)).toBeFalsy()
  })
})
