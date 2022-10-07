import { InvalidPercentageError } from './InvalidPercentage'

export type CouponProps = {
  code: string
  percentage: number
}

export class Coupon {
  private readonly code: string
  private readonly percentage: number

  constructor ({
    code,
    percentage
  }: CouponProps) {
    this.code = code
    this.percentage = percentage

    if (!this.isValidPercentage()) throw new InvalidPercentageError(percentage)
  }

  private isValidPercentage (): boolean {
    return this.percentage > 0 && this.percentage <= 100
  }
}
