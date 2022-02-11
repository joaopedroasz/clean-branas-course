import { Item } from './Item'

export class Freight {
  private readonly items: Item[]

  private readonly DISTANCE = 1000

  constructor (items: Item[]) {
    this.items = items
  }

  public calculate (): number {
    let calculatedFreight = 0

    for (const item of this.items) {
      calculatedFreight += this.DISTANCE * item.calculateVolume() * this.convertDensity(item)
    }

    return calculatedFreight < 10 ? 10 : calculatedFreight
  }

  private convertDensity (item: Item): number {
    return item.calculateDensity() / 100
  }
}
