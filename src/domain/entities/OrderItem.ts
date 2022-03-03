import { OrderItemProperties } from './types'

export class OrderItem {
  public readonly itemId: string
  public readonly quantity: number
  public readonly price: number
  public readonly id?: string

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
