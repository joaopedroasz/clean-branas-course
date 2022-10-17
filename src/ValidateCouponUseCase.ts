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
    await this.getCouponByIdRepository.getByCode(input.couponCode)

    return {
      isValid: true,
      coupon: {
        id: 'any_coupon_id',
        code: input.couponCode,
        dueDate: new Date(),
        percentage: 10
      }
    }
  }
}
