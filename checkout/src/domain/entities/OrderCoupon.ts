import { InvalidPercentageError } from '../errors'

export type OrderCouponProps = {
  code: string
  percentage: number
}

export class OrderCoupon {
  public readonly code: string
  public readonly percentage: number

  constructor ({ code, percentage }: OrderCouponProps) {
    this.code = code
    this.percentage = percentage

    if (!this.isValidPercentage()) throw new InvalidPercentageError(this.percentage)
  }

  private isValidPercentage (): boolean {
    return this.percentage >= 0
  }
}
