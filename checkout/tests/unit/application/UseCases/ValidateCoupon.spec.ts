import { Coupon, CouponProps } from '@/domain/entities'
import { GetCouponByCodeRepository } from '@/domain/repositories/Coupon'
import { ValidateCoupon } from '@/application/contracts/UseCases/ValidateCoupon'
import { ValidateCouponUseCase } from '@/application/UseCases'

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

    expect(result.isValid).toBeFalsy()
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

  it('should return false if coupon is expired', async () => {
    const { sut, getCouponByCodeRepository } = makeSut()
    const couponCode = 'any_code'
    const dueDate = new Date('2020-10-17')
    const today = new Date('2021-10-18')
    const expiredCoupon = makeCoupon({ code: couponCode, dueDate })
    vi.spyOn(getCouponByCodeRepository, 'getByCode').mockResolvedValueOnce(expiredCoupon)

    const result = await sut.execute({ couponCode, date: today })

    expect(result.isValid).toBeFalsy()
  })

  it('should return true if coupon is NOT expired', async () => {
    const { sut, getCouponByCodeRepository } = makeSut()
    const couponCode = 'any_code'
    const dueDate = new Date('2022-10-18')
    const today = new Date('2021-10-17')
    const expiredCoupon = makeCoupon({ code: couponCode, dueDate })
    vi.spyOn(getCouponByCodeRepository, 'getByCode').mockResolvedValueOnce(expiredCoupon)

    const result = await sut.execute({ couponCode, date: today })

    expect(result.isValid).toBeTruthy()
  })
})
