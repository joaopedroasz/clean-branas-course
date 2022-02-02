export class Coupon {
  public readonly id?: string
  public readonly percentage: number

  constructor (percentage: number, id?: string) {
    this.id = id
    this.percentage = percentage
  }
}
