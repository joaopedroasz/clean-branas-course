type OrderOutput = {
  CPF: string
  code: string
  purchaseDate: Date
}

type PlaceOrderOutputProps = {
  total: number
  order: OrderOutput
}

export class PlaceOrderOutputDTO {
  public readonly total: number
  public readonly order: OrderOutput

  constructor ({
    total,
    order
  }: PlaceOrderOutputProps) {
    this.total = total
    this.order = order
  }
}
