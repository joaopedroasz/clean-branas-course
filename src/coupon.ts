export class Coupon {
  public readonly id?: string
  public readonly code: string
  public readonly percentage: number

  constructor (code: string, percentage: number, id?: string) {
    this.id = id
    this.code = code
    this.percentage = percentage
  }
}
