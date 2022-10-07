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
  }
}
