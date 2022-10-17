import { ValidateCoupon } from '@/ValidateCoupon'
import { ValidateCouponUseCase } from '@/ValidateCouponUseCase'
import { Coupon, CouponProps } from '@/Coupon'
import { GetCouponByCodeRepository } from './GetCouponByCodeRepository'

const makeCoupon = (props?: Partial<CouponProps>): Coupon => new Coupon({
  code: 'any_code',
  percentage: 10,
  dueDate: new Date('2022-10-17'),
  ...props
})

const makeGetCouponByCodeRepository = (): GetCouponByCodeRepository => ({
  getByCode: async (code: string) => makeCoupon({ code })
})

type SutTypes = {
  sut: ValidateCoupon
  getCouponByCodeRepository: GetCouponByCodeRepository
}

const makeSut = (): SutTypes => {
  const getCouponByCodeRepository = makeGetCouponByCodeRepository()
  const sut = new ValidateCouponUseCase(getCouponByCodeRepository)
  return {
    sut,
    getCouponByCodeRepository
  }
}

describe('Validate Coupon Use Case', () => {
  it('should validate coupon by id', async () => {
    const { sut } = makeSut()
    const couponCode = 'any_code'

    const result = await sut.execute({ couponCode })

    expect(result.isValid).toBeTruthy()
    expect(result.coupon).toBeDefined()
  })

  it('should call GetCouponByIdRepository correctly', async () => {
    const { sut, getCouponByCodeRepository } = makeSut()
    const getCouponByCodeRepositorySpy = vi.spyOn(getCouponByCodeRepository, 'getByCode')
    const couponCode = 'any_code'

    await sut.execute({ couponCode })

    expect(getCouponByCodeRepositorySpy).toHaveBeenCalledTimes(1)
    expect(getCouponByCodeRepositorySpy).toHaveBeenCalledWith(couponCode)
  })

  it('should return same coupon loaded by GetCouponByIdRepository', async () => {
    const { sut, getCouponByCodeRepository } = makeSut()
    const couponCode = 'any_code'
    const coupon = makeCoupon({ code: couponCode })
    vi.spyOn(getCouponByCodeRepository, 'getByCode').mockResolvedValueOnce(coupon)

    const result = await sut.execute({ couponCode })

    expect(result.coupon).toEqual({
      code: coupon.getCode(),
      dueDate: coupon.getDueDate(),
      percentage: coupon.getPercentage()
    })
  })
})
