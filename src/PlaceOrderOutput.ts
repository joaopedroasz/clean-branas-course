type PlaceOrderOutputProps = {
  order: number
  couponDiscount: number
  total: number
}

export class PlaceOrderOutputDTO {
  public readonly order: number
  public readonly couponDiscount: number
  public readonly total: number

  constructor ({
    couponDiscount,
    order,
    total
  }: PlaceOrderOutputProps) {
    this.order = order
    this.couponDiscount = couponDiscount
    this.total = total
  }
}
