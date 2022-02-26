import { Item } from './Item'

export class Freight {
  private readonly item: Item

  private readonly DISTANCE = 1000

  constructor (item: Item) {
    this.item = item
  }

  public calculate (): number {
    const calculatedFreight = this.DISTANCE * this.item.calculateVolume() * this.convertDensity(this.item)

    return calculatedFreight < 10 ? 10 : calculatedFreight
  }

  private convertDensity (item: Item): number {
    return item.calculateDensity() / 100
  }
}
