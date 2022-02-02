export class OrderItem {
  public readonly itemId: string
  public readonly quantity: number
  public readonly price: number
  public readonly id?: string

  constructor (itemId: string, quantity: number, price: number, id?: string) {
    this.id = id
    this.itemId = itemId
    this.quantity = quantity
    this.price = price
  }
}
