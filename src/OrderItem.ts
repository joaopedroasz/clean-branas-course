import { InvalidQuantityError } from './InvalidQuantity'

export type OrderItemProps = {
  itemId: string
  price: number
  quantity: number
}

export class OrderItem {
  private readonly itemId: string
  private readonly price: number
  private readonly quantity: number

  constructor ({
    itemId,
    price,
    quantity
  }: OrderItemProps) {
    this.itemId = itemId
    this.price = price
    this.quantity = quantity

    if (!this.isValidQuantity(quantity)) throw new InvalidQuantityError(quantity)
  }

  private isValidQuantity (quantity: number): boolean {
    return quantity > 0
  }

  public getItemId (): string {
    return this.itemId
  }

  public calculatePrice (): number {
    return this.price * this.quantity
  }
}
