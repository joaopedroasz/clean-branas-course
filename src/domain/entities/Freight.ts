import { Item } from './Item'
import { FreightProperties } from './types'

export class Freight {
  private readonly value: number

  private readonly DISTANCE = 1000
  private readonly MINIMUM_FREIGHT_VALUE = 10

  constructor (
    {
      item,
      quantity
    }: FreightProperties
  ) {
    this.value = this.calculate(item, quantity)
  }

  private calculate (item: Item, quantity: number): number {
    const freightForOneItem = this.DISTANCE * item.calculateVolume() * this.convertDensity(item)

    const totalFreight = freightForOneItem * quantity

    return totalFreight < this.MINIMUM_FREIGHT_VALUE ? this.MINIMUM_FREIGHT_VALUE : totalFreight
  }

  private convertDensity (item: Item): number {
    return item.calculateDensity() / 100
  }

  public getValue (): number {
    return this.value
  }
}
