import { GetCouponByCodeRepository } from './GetCouponByCodeRepository'
import { ValidateCoupon } from './ValidateCoupon'
import { ValidateCouponInputDTO } from './ValidateCouponInputDTO'
import { ValidateCouponOutputDTO } from './ValidateCouponOutputDTO'

export class ValidateCouponUseCase implements ValidateCoupon {
  private readonly getCouponByIdRepository: GetCouponByCodeRepository

  constructor (getCouponByIdRepository: GetCouponByCodeRepository) {
    this.getCouponByIdRepository = getCouponByIdRepository
  }

  public async execute (input: ValidateCouponInputDTO): Promise<ValidateCouponOutputDTO> {
    const { couponCode, date } = input
    const coupon = await this.getCouponByIdRepository.getByCode(couponCode)
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
