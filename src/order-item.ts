export class OrderItem {
  public readonly id: string
  public readonly itemId: string
  public readonly quantity: number
  public readonly price: number

  constructor (id: string, itemId: string, quantity: number, price: number) {
    this.id = id
    this.itemId = itemId
    this.quantity = quantity
    this.price = price
  }
}
