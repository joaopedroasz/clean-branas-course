import { InvalidQuantityError } from './InvalidQuantity'
import { Item } from './Item'

export type OrderItemProps = {
  item: Item
  quantity: number
}

export class OrderItem {
  private readonly item: Item
  private readonly quantity: number

  constructor ({
    item,
    quantity
  }: OrderItemProps) {
    this.item = item
    this.quantity = quantity

    if (!this.isValidQuantity(quantity)) throw new InvalidQuantityError(quantity)
  }

  private isValidQuantity (quantity: number): boolean {
    return quantity > 0
  }

  public getItem (): Item {
    return this.item
  }

  public calculatePrice (): number {
    return this.item.getPrice() * this.quantity
  }
}
