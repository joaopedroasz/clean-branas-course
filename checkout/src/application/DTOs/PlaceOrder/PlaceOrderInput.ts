type PlaceOrderInputProps = {
  buyerCPF: string
  orderItems: Array<{ itemId: string, quantity: number }>
  couponCode?: string
  purchaseDate?: Date
}

export class PlaceOrderInputDTO {
  public readonly buyerCPF: string
  public readonly orderItems: Array<{ itemId: string, quantity: number }>
  public readonly couponCode?: string
  public readonly purchaseDate?: Date

  constructor ({
    buyerCPF,
    orderItems,
    couponCode,
    purchaseDate
  }: PlaceOrderInputProps) {
    this.buyerCPF = buyerCPF
    this.orderItems = orderItems
    this.couponCode = couponCode
    this.purchaseDate = purchaseDate
  }
}
