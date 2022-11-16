import { Coordinates } from './Coordinates'

export type CityProps = {
  id: string
  name: string
  latitude: number
  longitude: number
}

export class City {
  private readonly id: string
  private readonly name: string
  private readonly coordinates: Coordinates

  constructor ({
    id,
    latitude,
    longitude,
    name
  }: CityProps) {
    this.id = id
    this.name = name
    this.coordinates = new Coordinates({ latitude, longitude })
  }

  public getCoordinates (): Coordinates {
    return this.coordinates
  }
}
