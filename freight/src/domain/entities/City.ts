import { Coordinates } from './Coordinates'

export type CityProps = {
  id: string
  name: string
  latitude: number
  longitude: number
}

export class City {
  readonly id: string
  readonly name: string
  readonly coordinates: Coordinates

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
}
