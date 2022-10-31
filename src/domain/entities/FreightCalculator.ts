import { InvalidDistanceError, InvalidQuantityError } from '@/domain/errors'
import { Item } from './Item'

export type FreightCalculatorProps = {
  item: Item
  quantity: number
  distanceInKm: number
}

export class FreightCalculator {
  private readonly DENSITY_FACTOR = 100

  private readonly item: Item
  private readonly quantity: number
  private readonly distanceInKm: number

  constructor ({
    item,
    quantity,
    distanceInKm
  }: FreightCalculatorProps) {
    this.item = item
    this.quantity = quantity
    this.distanceInKm = distanceInKm

    if (!this.isValidNumber(this.quantity)) throw new InvalidQuantityError(quantity)
    if (!this.isValidNumber(this.distanceInKm)) throw new InvalidDistanceError(distanceInKm)
  }

  private isValidNumber (value: number): boolean {
    return value > 0
  }

  public calculate (): number {
    const density = this.item.calculateDensity() / this.DENSITY_FACTOR
    const freight = this.distanceInKm * this.item.calculateVolumeInCubicMeter() * density
    const totalFreight = freight * this.quantity
    return Math.max(totalFreight, 10)
  }
}
