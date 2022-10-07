import { InvalidPriceError } from './InvalidPrice'

export type ItemProps = {
  description: string
  price: number
}

export class Item {
  private readonly description: string
  private readonly price: number

  constructor ({
    description,
    price
  }: ItemProps) {
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
