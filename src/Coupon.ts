import { InvalidPercentageError } from './InvalidPercentage'

export type CouponProps = {
  code: string
  percentage: number
  dueDate?: Date
  today?: Date
}

export class Coupon {
  private readonly code: string
  private readonly percentage: number
  private readonly dueDate?: Date

  constructor ({
    code,
    percentage,
    dueDate
  }: CouponProps) {
    this.code = code
    this.percentage = percentage
    this.dueDate = dueDate

    if (!this.isValidPercentage()) throw new InvalidPercentageError(percentage)
  }

  private isValidPercentage (): boolean {
    return this.percentage > 0 && this.percentage <= 100
  }

  public isExpired (today: Date): boolean {
    if (!this.dueDate) return false
    return this.dueDate.getTime() <= today.getTime()
  }

  public calculatePriceDiscount (price: number): number {
    const discount = this.getPercentageDiscount(price)
    return price - discount
  }

  public getPercentageDiscount (price: number): number {
    return price * (this.percentage / 100)
  }
}
