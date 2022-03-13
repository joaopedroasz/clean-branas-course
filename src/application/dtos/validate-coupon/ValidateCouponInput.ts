import { ValidateCouponInputProperties } from './types'

export class ValidateCouponInput {
  public readonly couponId: string
  public readonly currentDate? = new Date()

  constructor ({
    couponId,
    currentDate
  }: ValidateCouponInputProperties) {
    this.couponId = couponId
    this.currentDate = currentDate
  }
}
