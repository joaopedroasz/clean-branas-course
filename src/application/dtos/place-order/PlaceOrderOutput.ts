export class PlaceOrderOutput {
  public readonly total: number
  public readonly createdOrderId: string

  constructor (total: number, orderId: string) {
    this.total = total
    this.createdOrderId = orderId
  }
}
