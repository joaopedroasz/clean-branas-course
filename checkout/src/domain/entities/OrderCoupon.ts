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

  public getCode (): string {
    return this.code
  }

  public getPercentage (): number {
    return this.percentage
  }

  public calculatePriceDiscount (price: number): number {
    const discount = this.getPercentageDiscount(price)
    return price - discount
  }

  public getPercentageDiscount (price: number): number {
    return price * (this.percentage / 100)
  }
}
