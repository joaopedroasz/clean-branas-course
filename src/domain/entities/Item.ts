import { ItemProperties } from './types'

import { InvalidEmptyIdError } from '../errors'

export class Item {
  private readonly id?: string
  private readonly category: string
  private readonly description: string
  private readonly price: number
  private readonly heightInCM: number
  private readonly widthInCM: number
  private readonly depthInCM: number
  private readonly weightInCM: number

  private readonly CONVERT_TO_CUBIC_METERS_FACTOR = 1_000_000

  constructor (
    {
      id,
      category,
      description,
      price,
      heightInCM,
      widthInCM,
      depthInCM,
      weightInCM
    }: ItemProperties
  ) {
    this.id = id
    this.category = category
    this.description = description
    this.price = price
    this.heightInCM = heightInCM
    this.widthInCM = widthInCM
    this.depthInCM = depthInCM
    this.weightInCM = weightInCM
  }

  public getId (): string {
    if (!this.id) throw new InvalidEmptyIdError()

    return this.id
  }

  public getPrice (): number {
    return this.price
  }

  public calculateVolume (): number {
    return (this.heightInCM * this.widthInCM * this.depthInCM) / this.CONVERT_TO_CUBIC_METERS_FACTOR
  }

  public calculateDensity (): number {
    return this.weightInCM / this.calculateVolume()
  }
}
