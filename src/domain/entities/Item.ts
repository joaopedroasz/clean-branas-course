export type ItemProps = {
  id?: string
  category: string
  description: string
  price: number
  heightInCM: number
  widthInCM: number
  depthInCM: number
  weightInCM: number
}

export class Item {
  public readonly id?: string
  public readonly category: string
  public readonly description: string
  public readonly price: number
  public readonly heightInCM: number
  public readonly widthInCM: number
  public readonly depthInCM: number
  public readonly weightInCM: number

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
    }: ItemProps
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

  public calculateVolume (): number {
    return (this.heightInCM * this.widthInCM * this.depthInCM) / this.CONVERT_TO_CUBIC_METERS_FACTOR
  }

  public calculateDensity (): number {
    return this.weightInCM / this.calculateVolume()
  }
}
