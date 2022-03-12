import { ValidateCouponInput } from '../dtos/validate-coupon'

export class ValidateCoupon implements ValidateCoupon {
  public async execute (input: ValidateCouponInput): Promise<boolean> {
    const { couponId } = input

    if (!couponId) return false

    return true
  }
}
