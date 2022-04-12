import { CouponRepository } from '@/domain/repositories'
import { ValidateCouponInput } from '../dtos'

export class ValidateCoupon implements ValidateCoupon {
  private readonly couponRepository: CouponRepository

  constructor (couponRepository: CouponRepository) {
    this.couponRepository = couponRepository
  }

  public async execute (input: ValidateCouponInput): Promise<boolean> {
    const { couponId, currentDate } = input
    try {
      if (!couponId) return false

      const coupon = await this.couponRepository.getById(couponId)

      const isCouponValid = coupon.isValid(currentDate)

      return isCouponValid
    } catch (error) {
      return false
    }
  }
}
