export class Item {
  public readonly id?: string
  public readonly category: string
  public readonly description: string
  public readonly price: number
  public readonly height: number
  public readonly width: number
  public readonly depth: number
  public readonly weight: number

  constructor (
    category: string,
    description: string,
    price: number,
    height: number,
    width: number,
    depth: number,
    weight: number,
    id?: string
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

  public calculateVolume (): number {
    return (this.height * this.width * this.depth) / 1_000_000
  }
}
