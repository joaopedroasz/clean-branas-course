import { InvalidQuantityError } from './InvalidQuantity'
import { Item } from './Item'

export type FreightCalculatorProps = {
  item: Item
  quantity: number
}

export class FreightCalculator {
  private readonly FREIGHT_DISTANCE = 1000
  private readonly DENSITY_FACTOR = 100

  private readonly item: Item
  private readonly quantity: number

  constructor ({
    item,
    quantity
  }: FreightCalculatorProps) {
    this.item = item
    this.quantity = quantity

    if (!this.isQuantityValid()) throw new InvalidQuantityError(quantity)
  }

  private isQuantityValid (): boolean {
    return this.quantity > 0
  }

  calculate (): number {
    const density = this.item.calculateDensity() / this.DENSITY_FACTOR
    const freight = this.FREIGHT_DISTANCE * this.item.calculateVolumeInCubicMeter() * density
    const totalFreight = freight * this.quantity
    return Math.max(totalFreight, 10)
  }
}
