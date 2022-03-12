import { ExpiredCouponError } from './errors'
import { CouponProperties } from './types'

export class Coupon {
  public readonly id?: string
  public readonly code: string
  public readonly percentage: number
  public readonly expiresIn?: Date

  constructor (
    {
      id,
      code,
      percentage,
      currentDate = new Date(),
      expiresIn
    }: CouponProperties
  ) {
    this.expiresIn = expiresIn
    this.validateExpirationDate(currentDate)
    this.id = id
    this.code = code
    this.percentage = percentage
  }

  private validateExpirationDate (currentDate: Date): void {
    if (this.isExpired(currentDate)) throw new ExpiredCouponError(this.expiresIn)
  }

  public isExpired (currentDate = new Date()): boolean {
    if (!this.expiresIn) return false

    return this.expiresIn.getTime() < currentDate.getTime()
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
