import { Coordinates } from './Coordinates'

export type DistanceCalculatorProps = {
  origin: Coordinates
  destination: Coordinates
}

export class DistanceCalculator {
  private readonly origin: Coordinates
  private readonly destination: Coordinates

  constructor ({
    origin,
    destination
  }: DistanceCalculatorProps) {
    this.origin = origin
    this.destination = destination
  }

  public calculate (): number {
    if (this.coordinatesEquals()) return 0

    return 0
  }

  private coordinatesEquals (): boolean {
    return this.origin.equals(this.destination)
  }
}
