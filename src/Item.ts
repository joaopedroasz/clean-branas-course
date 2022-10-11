import { InvalidPriceError } from './InvalidPrice'

export type ItemProps = {
  id: string
  description: string
  price: number
}

export class Item {
  private readonly id: string
  private readonly description: string
  private readonly price: number

  constructor ({
    id,
    description,
    price
  }: ItemProps) {
    this.id = id
    this.description = description
    this.price = price

    if (!this.isValidPrice()) throw new InvalidPriceError(price)
  }

  private isValidPrice (): boolean {
    return this.price > 0
  }

  public getPrice (): number {
    return this.price
  }
}
