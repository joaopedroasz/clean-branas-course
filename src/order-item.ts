export class OrderItem {
  public readonly id: string
  public readonly itemId: string
  public readonly quantity: number
  public readonly totalPrice: number

  constructor (id: string, itemId: string, quantity: number, totalPrice: number) {
    this.id = id
    this.itemId = itemId
    this.quantity = quantity
    this.totalPrice = totalPrice
  }
}
