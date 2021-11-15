export class OrderItem {
  public readonly id: string
  public readonly itemId: string
  public readonly quantity: number

  constructor (id: string, itemId: string, quantity: number) {
    this.id = id
    this.itemId = itemId
    this.quantity = quantity
  }
}
