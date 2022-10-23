import { GetCouponByCodeRepository } from '@/domain/repositories/Coupon'
import { ValidateCoupon } from '@/application/contracts'
import { ValidateCouponInputDTO, ValidateCouponOutputDTO } from '@/application/DTOs'

export class ValidateCouponUseCase implements ValidateCoupon {
  private readonly getCouponByCodeRepository: GetCouponByCodeRepository

  constructor (getCouponByCodeRepository: GetCouponByCodeRepository) {
    this.getCouponByCodeRepository = getCouponByCodeRepository
  }

  public async execute (input: ValidateCouponInputDTO): Promise<ValidateCouponOutputDTO> {
    const { couponCode, date } = input
    const coupon = await this.getCouponByCodeRepository.getByCode(couponCode)
    const isValid = coupon.isExpired(date)

    return {
      isValid,
      coupon: {
        code: coupon.getCode(),
        dueDate: coupon.getDueDate(),
        percentage: coupon.getPercentage()
      }
    }
  }
}
