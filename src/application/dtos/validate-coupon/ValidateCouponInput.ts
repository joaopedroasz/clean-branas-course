import { ValidateCouponInputProperties } from './types'

export class ValidateCouponInput {
  public readonly couponId?: string

  constructor ({
    couponId
  }: ValidateCouponInputProperties) {
    this.couponId = couponId
  }
}
