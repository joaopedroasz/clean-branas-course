type OrderOutput = {
  CPF: string
  code: string
  purchaseDate: Date
}

type PlaceOrderOutputProps = {
  total: number
  order: OrderOutput
  freight: number
}

export class PlaceOrderOutputDTO {
  public readonly total: number
  public readonly order: OrderOutput
  public readonly freight: number

  constructor ({
    total,
    order,
    freight
  }: PlaceOrderOutputProps) {
    this.total = total
    this.order = order
    this.freight = freight
  }
}
