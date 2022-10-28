import { InvalidLatitudeError, InvalidLongitudeError } from '../errors'

export type CoordinatesProps = {
  latitude: number
  longitude: number
}

export class Coordinates {
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
    return this.latitude === other.latitude
  }
}
