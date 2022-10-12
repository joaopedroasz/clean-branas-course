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
  private readonly heightInCm: number
  private readonly widthInCm: number
  private readonly depthInCm: number
  private readonly weightInKg: number

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
    this.heightInCm = heightInCm
    this.widthInCm = widthInCm
    this.depthInCm = depthInCm
    this.weightInKg = weightInKg

    if (!this.isValidPrice()) throw new InvalidPriceError(price)
    if (!this.isValidDimensions()) throw new Error('Invalid dimension')
  }

  private isValidPrice (): boolean {
    return this.price > 0
  }

  private isValidDimensions (): boolean {
    const dimensions = [
      this.heightInCm,
      this.widthInCm,
      this.depthInCm,
      this.weightInKg
    ]

    return dimensions.every(dimension => dimension > 0)
  }

  public getId (): string {
    return this.id
  }

  public getPrice (): number {
    return this.price
  }
}
