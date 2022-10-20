import { InvalidQuantityError } from '@/domain/errors'

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

    if (!this.isValidQuantity()) throw new InvalidQuantityError(quantity)
  }

  private isValidQuantity (): boolean {
    return this.quantity > 0
  }

  public getItemId (): string {
    return this.itemId
  }

  public calculatePrice (): number {
    return this.price * this.quantity
  }

  public getQuantity (): number {
    return this.quantity
  }
}
