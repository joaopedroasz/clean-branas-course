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

    if (!this.isValidQuantity(quantity)) throw new Error('Invalid quantity')
  }

  private isValidQuantity (quantity: number): boolean {
    return quantity > 0
  }

  public calculatePrice (): number {
    return this.item.getPrice() * this.quantity
  }
}
