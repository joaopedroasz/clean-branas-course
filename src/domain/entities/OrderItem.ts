import { OrderItemProperties } from './types'

export class OrderItem {
  private readonly itemId: string
  private readonly quantity: number
  private readonly price: number
  private readonly id?: string

  constructor (
    {
      id,
      itemId,
      quantity,
      price
    }: OrderItemProperties
  ) {
    this.id = id
    this.itemId = itemId
    this.quantity = quantity
    this.price = price
  }

  public getTotalPrice (): number {
    return this.price * this.quantity
  }
}
