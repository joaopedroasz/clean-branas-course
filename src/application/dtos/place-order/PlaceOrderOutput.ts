export class PlaceOrderOutput {
  public readonly total: number
  public readonly createdOrderId: string
  public readonly orderCode: string

  constructor (total: number, orderId: string, orderCode: string) {
    this.total = total
    this.createdOrderId = orderId
    this.orderCode = orderCode
  }
}
