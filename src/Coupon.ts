import { ExpiredCouponError } from '@/errors'

export class Coupon {
  public readonly id?: string
  public readonly code: string
  public readonly percentage: number
  public readonly expiresIn?: Date

  constructor (code: string, percentage: number, expiresIn?: Date, id?: string) {
    this.validateExpirationDate(expiresIn)
    this.id = id
    this.code = code
    this.percentage = percentage
    this.expiresIn = expiresIn
  }

  private validateExpirationDate (date?: Date): void {
    if (this.isExpired(date)) throw new ExpiredCouponError(date)
  }

  private isExpired (date?: Date): boolean {
    if (!date) return false

    const currentDate = new Date()

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
