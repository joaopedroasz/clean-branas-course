export class Item {
  public readonly id?: string
  public readonly category: string
  public readonly description: string
  public readonly price: number

  constructor (category: string, description: string, price: number, id?: string) {
    this.id = id
    this.category = category
    this.description = description
    this.price = price
  }
}
