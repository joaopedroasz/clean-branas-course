export class Item {
  public description: string
  public price: number
  public quantity: number

  constructor (description: string, price: number, quantity: number) {
    this.description = description
    this.price = price
    this.quantity = quantity
  }
}
