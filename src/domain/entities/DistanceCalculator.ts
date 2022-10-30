import { Coordinates } from './Coordinates'

export type DistanceCalculatorProps = {
  origin: Coordinates
  destination: Coordinates
}

export class DistanceCalculator {
  private readonly DEGREES_TO_KM_FACTOR = 60 * 1.1515 * 1.609344

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

    const theta = this.origin.calculateThetaInRadians(this.destination)
    const distance =
      Math.sin(this.origin.latitudeInRadians()) *
      Math.sin(this.destination.latitudeInRadians()) +
      Math.cos(this.origin.latitudeInRadians()) *
      Math.cos(this.destination.latitudeInRadians()) *
      Math.cos(theta)
    const distanceInRadians = Math.acos(distance)
    const distanceInDegrees = this.calculateInDegrees(distanceInRadians)
    const distanceInKilometers = this.calculateInKilometers(distanceInDegrees)
    return distanceInKilometers
  }

  private coordinatesEquals (): boolean {
    return this.origin.equals(this.destination)
  }

  private calculateInDegrees (radians: number): number {
    return radians * (180 / Math.PI)
  }

  public calculateInKilometers (degrees: number): number {
    return degrees * this.DEGREES_TO_KM_FACTOR
  }
}
