import { ExpiredCouponError } from './errors'

export class Coupon {
  public readonly id?: string
  public readonly code: string
  public readonly percentage: number
  public readonly expiresIn?: Date

  constructor (
    code: string,
    percentage: number,
    currentDate = new Date(),
    expiresIn?: Date,
    id?: string
  ) {
    this.validateExpirationDate(currentDate, expiresIn)
    this.id = id
    this.code = code
    this.percentage = percentage
    this.expiresIn = expiresIn
  }

  private validateExpirationDate (currentDate: Date, date?: Date): void {
    if (this.isExpired(currentDate, date)) throw new ExpiredCouponError(date)
  }

  private isExpired (currentDate: Date, date?: Date): boolean {
    if (!date) return false

    return date.getTime() < currentDate.getTime()
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
