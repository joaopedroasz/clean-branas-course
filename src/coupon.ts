export class Coupon {
  public readonly id?: string
  public readonly code: string
  public readonly percentage: number

  constructor (code: string, percentage: number, id?: string) {
    this.id = id
    this.code = code
    this.percentage = percentage
  }

  public calculateValueWithDiscount (value: number): number {
    return value - this.calculateDiscount(value)
  }

  private calculateDiscount (value: number): number {
    return value * this.calculatePercentage()
  }

  private calculatePercentage (): number {
    return this.percentage / 100
  }
}
