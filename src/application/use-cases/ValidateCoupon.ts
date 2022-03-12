import { CouponRepository } from '@/domain/repositories'
import { ValidateCouponInput } from '../dtos/validate-coupon'

export class ValidateCoupon implements ValidateCoupon {
  private readonly couponRepository: CouponRepository

  constructor (couponRepository: CouponRepository) {
    this.couponRepository = couponRepository
  }

  public async execute (input: ValidateCouponInput): Promise<boolean> {
    const { couponId } = input
    try {
      if (!couponId) return false

      const coupon = await this.couponRepository.getById(couponId)

      const isCouponValid = !coupon.isExpired()

      return isCouponValid
    } catch (error) {
      return false
    }
  }
}
