export class PlaceOrderOutput {
  public readonly total: number
  public readonly orderCode: string

  constructor (total: number, orderId: string, orderCode: string) {
    this.total = total
    this.orderCode = orderCode
  }
}
