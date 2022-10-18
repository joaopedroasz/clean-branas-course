type PlaceOrderOutputProps = {
  total: number
}

export class PlaceOrderOutputDTO {
  public readonly total: number

  constructor ({
    total
  }: PlaceOrderOutputProps) {
    this.total = total
  }
}
