import { Dimensions } from './Dimensions'
import { InvalidPriceError } from './InvalidPrice'
import { InvalidWeightError } from './InvalidWeight'

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
  private readonly FREIGHT_DISTANCE = 1000
  private readonly DENSITY_FACTOR = 100

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
    if (!this.isValidWeight()) throw new InvalidWeightError(weightInKg)
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

  public calculateDensity (): number {
    const density = this.weightInKg / this.dimensions.calculateVolumeInCubicMeter()
    return Math.round(density)
  }

  public calculateFreight (): number {
    const density = this.calculateDensity() / this.DENSITY_FACTOR
    return this.FREIGHT_DISTANCE * this.dimensions.calculateVolumeInCubicMeter() * density
  }
}
