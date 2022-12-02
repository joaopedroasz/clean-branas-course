type PlaceOrderInputProps = {
  buyerCPF: string
  orderItems: Array<{ itemId: string, quantity: number }>
  couponCode?: string
  purchaseDate?: Date
  from: string
  to: string
}

export class PlaceOrderInputDTO {
  public readonly buyerCPF: string
  public readonly orderItems: Array<{ itemId: string, quantity: number }>
  public readonly from: string
  public readonly to: string
  public readonly couponCode?: string
  public readonly purchaseDate?: Date

  constructor ({
    buyerCPF,
    orderItems,
    couponCode,
    purchaseDate,
    from,
    to
  }: PlaceOrderInputProps) {
    this.buyerCPF = buyerCPF
    this.orderItems = orderItems
    this.couponCode = couponCode
    this.purchaseDate = purchaseDate
    this.from = from
    this.to = to
  }
}
