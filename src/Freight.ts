import { Item } from './Item'

export class Freight {
  private readonly item: Item

  private readonly DISTANCE = 1000

  constructor (item: Item) {
    this.item = item
  }

  public calculate (): number {
    return this.DISTANCE * this.item.calculateVolume() * this.convertDensity()
  }

  private convertDensity (): number {
    return this.item.calculateDensity() / 100
  }
}
