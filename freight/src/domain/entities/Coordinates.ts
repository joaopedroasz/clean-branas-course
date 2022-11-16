import { InvalidLatitudeError, InvalidLongitudeError } from '../errors'

export type CoordinatesProps = {
  latitude: number
  longitude: number
}

export class Coordinates {
  private readonly CONVERT_TO_RADIAN_FACTOR = 180

  private readonly latitude: number
  private readonly longitude: number

  constructor ({
    latitude,
    longitude
  }: CoordinatesProps) {
    this.latitude = latitude
    this.longitude = longitude

    if (!this.isValidLatitude()) throw new InvalidLatitudeError(this.latitude)
    if (!this.isValidLongitude()) throw new InvalidLongitudeError(this.longitude)
  }

  private isValidLatitude (): boolean {
    return this.latitude >= -90 && this.latitude <= 90
  }

  private isValidLongitude (): boolean {
    return this.longitude <= 180 && this.longitude >= -180
  }

  public equals (other: Coordinates): boolean {
    return this.latitude === other.latitude && this.longitude === other.longitude
  }

  public latitudeInRadians (): number {
    return this.calculateInRadians(this.latitude)
  }

  public longitudeInRadians (): number {
    return this.calculateInRadians(this.longitude)
  }

  private calculateInRadians (degreeValue: number): number {
    return degreeValue * Math.PI / this.CONVERT_TO_RADIAN_FACTOR
  }

  public calculateTheta (other: Coordinates): number {
    return this.longitude - other.longitude
  }

  public calculateThetaInRadians (other: Coordinates): number {
    return this.calculateInRadians(this.calculateTheta(other))
  }
}
