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
  }
}
