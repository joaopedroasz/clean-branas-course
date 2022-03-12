import { ItemTableProperties } from './types'

export class ItemTable {
  public readonly id: string
  public readonly category: string
  public readonly description: string
  public readonly price: number
  public readonly height: number
  public readonly width: number
  public readonly depth: number
  public readonly weight: number

  constructor (
    {
      id,
      category,
      description,
      price,
      height,
      width,
      depth,
      weight
    }: ItemTableProperties
  ) {
    this.id = id
    this.category = category
    this.description = description
    this.price = price
    this.height = height
    this.width = width
    this.depth = depth
    this.weight = weight
  }
}
