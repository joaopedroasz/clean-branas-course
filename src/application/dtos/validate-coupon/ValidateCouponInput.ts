import { ValidateCouponInputProperties } from './types'

export class ValidateCouponInput {
  public readonly couponId?: string
  public readonly couponExpireDate?: Date

  constructor ({
    couponId,
    couponExpiredDate
  }: ValidateCouponInputProperties) {
    this.couponId = couponId
    this.couponExpireDate = couponExpiredDate
  }
}
