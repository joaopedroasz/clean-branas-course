export class PlaceOrderOutput {
  public readonly total: number
  public readonly orderId: string
  public readonly orderCode: string

  constructor (total: number, orderId: string, orderCode: string) {
    this.total = total
    this.orderId = orderId
    this.orderCode = orderCode
  }
}
