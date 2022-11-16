import { InvalidDistanceError, InvalidQuantityError } from '@/domain/errors'

export type FreightCalculatorProps = {
  density: number
  volume: number
  quantity: number
  distanceInKm: number
}

export class FreightCalculator {
  private readonly DENSITY_FACTOR = 100

  private readonly density: number
  private readonly volume: number
  private readonly quantity: number
  private readonly distanceInKm: number

  constructor ({
    density,
    volume,
    quantity,
    distanceInKm
  }: FreightCalculatorProps) {
    this.quantity = quantity
    this.distanceInKm = distanceInKm
    this.density = density
    this.volume = volume

    if (!this.isValidNumber(this.quantity)) throw new InvalidQuantityError(quantity)
    if (!this.isValidNumber(this.distanceInKm)) throw new InvalidDistanceError(distanceInKm)
  }

  private isValidNumber (value: number): boolean {
    return value > 0
  }

  public calculate (): number {
    const density = this.density / this.DENSITY_FACTOR
    const freight = this.distanceInKm * this.volume * density
    const totalFreight = freight * this.quantity
    return Math.max(totalFreight, 10)
  }
}
