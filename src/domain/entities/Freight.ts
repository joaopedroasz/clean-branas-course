import { Item } from './Item'
import { FreightProperties } from './types'

export class Freight {
  private readonly item: Item
  private readonly quantity: number

  private readonly DISTANCE = 1000

  constructor (
    {
      item,
      quantity
    }: FreightProperties
  ) {
    this.item = item
    this.quantity = quantity
  }

  public calculate (): number {
    const freightForOneItem = this.DISTANCE * this.item.calculateVolume() * this.convertDensity(this.item)

    const totalFreight = freightForOneItem * this.quantity

    return totalFreight < 10 ? 10 : totalFreight
  }

  private convertDensity (item: Item): number {
    return item.calculateDensity() / 100
  }
}
