import { InvalidPriceError, InvalidWeightError } from '@/domain/errors'
import { OrderItem } from './OrderItem'

export type ItemProps = {
  id: string
  description: string
  price: number
  heightInCm: number
  widthInCm: number
  depthInCm: number
  weightInKg: number
  volumeInCubicMeter: number
  density: number
}

export class Item {
  private readonly id: string
  private readonly description: string
  private readonly price: number
  private readonly heightInCm: number
  private readonly widthInCm: number
  private readonly depthInCm: number
  private readonly weightInKg: number
  private readonly volumeInCubicMeter: number
  private readonly density: number

  constructor ({
    id,
    description,
    price,
    heightInCm,
    widthInCm,
    depthInCm,
    weightInKg,
    density,
    volumeInCubicMeter
  }: ItemProps) {
    this.id = id
    this.description = description
    this.price = price
    this.heightInCm = heightInCm
    this.widthInCm = widthInCm
    this.depthInCm = depthInCm
    this.weightInKg = weightInKg
    this.volumeInCubicMeter = volumeInCubicMeter
    this.density = density

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

  public getDescription (): string {
    return this.description
  }

  public getWeight (): number {
    return this.weightInKg
  }

  public getHeight (): number {
    return this.heightInCm
  }

  public getWidth (): number {
    return this.widthInCm
  }

  public getDepth (): number {
    return this.depthInCm
  }

  public getDensity (): number {
    return Math.round(this.density)
  }

  public getVolume (): number {
    return this.volumeInCubicMeter
  }

  public createOrderItem (quantity: number): OrderItem {
    return new OrderItem({
      itemId: this.id,
      price: this.price,
      quantity
    })
  }
}
