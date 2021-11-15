export class Item {
  public id: string
  public description: string
  public price: number

  constructor (id: string, description: string, price: number) {
    this.id = id
    this.description = description
    this.price = price
  }
}
