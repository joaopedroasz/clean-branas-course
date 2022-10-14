type PlaceOrderInputProps = {
  buyerCPF: string
  orderItems: Array<{ itemId: string, quantity: number }>
  couponCode?: string
}

export class PlaceOrderInputDTO {
  public readonly buyerCPF: string
  public readonly orderItems: Array<{ itemId: string, quantity: number }>
  public readonly couponCode?: string

  constructor ({
    buyerCPF,
    orderItems,
    couponCode
  }: PlaceOrderInputProps) {
    this.buyerCPF = buyerCPF
    this.orderItems = orderItems
    this.couponCode = couponCode
  }
}
