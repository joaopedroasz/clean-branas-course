import { InvalidLatitudeError } from '../errors'

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
  }

  private isValidLatitude (): boolean {
    return this.latitude > -90 && this.latitude < 90
  }
}
