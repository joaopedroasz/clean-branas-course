import { Dimensions } from './Dimensions'
import { InvalidPriceError } from './InvalidPrice'

export type ItemProps = {
  id: string
  description: string
  price: number
  heightInCm: number
  widthInCm: number
  depthInCm: number
  weightInKg: number
}

export class Item {
  private readonly id: string
  private readonly description: string
  private readonly price: number
  private readonly weightInKg: number
  private readonly dimensions: Dimensions

  constructor ({
    id,
    description,
    price,
    heightInCm,
    widthInCm,
    depthInCm,
    weightInKg
  }: ItemProps) {
    this.id = id
    this.description = description
    this.price = price
    this.weightInKg = weightInKg
    this.dimensions = new Dimensions({
      heightInCm,
      widthInCm,
      depthInCm
    })

    if (!this.isValidPrice()) throw new InvalidPriceError(price)
    if (!this.isValidWeight()) throw new Error('Invalid weight')
  }

  private isValidPrice (): boolean {
    return this.price > 0
  }

  private isValidWeight (): boolean {
    return this.weightInKg > 0
  }

  public getId (): string {
    return this.id
  }

  public getPrice (): number {
    return this.price
  }
}
