import { CouponRepository } from '@/domain/repositories'
import { CouponNotFoundError } from '@/domain/errors'
import { ValidateCoupon } from '@/application/use-cases'

import { CouponRepositoryStub } from '@/tests/stub/repositories'

type makeSutTypes = {
  validateCoupon: ValidateCoupon
  couponRepository: CouponRepository
}

const makeSut = (): makeSutTypes => {
  const couponRepository = new CouponRepositoryStub()
  const validateCoupon = new ValidateCoupon(couponRepository)

  return {
    validateCoupon,
    couponRepository
  }
}

describe('Validate Coupon use case', () => {
  test('should create a validate coupon', () => {
    const { validateCoupon } = makeSut()

    expect(validateCoupon).toBeDefined()
  })

  test('should return true when valid Id is provided', async () => {
    const validId = '1'
    const { validateCoupon } = makeSut()

    const isValid = await validateCoupon.execute({ couponId: validId, currentDate: new Date('03/13/2022') })

    expect(isValid).toBe(true)
  })

  test('should return false when no Id is provided', async () => {
    const { validateCoupon } = makeSut()

    const isValid = await validateCoupon.execute({ couponId: '' })

    expect(isValid).toBe(false)
  })

  test('should return false when Coupon Repository does not find coupon', async () => {
    const invalidId = 'invalid_id'
    const { validateCoupon, couponRepository } = makeSut()

    jest.spyOn(couponRepository, 'getById').mockImplementationOnce(() => {
      throw new CouponNotFoundError(invalidId)
    })

    const isValid = await validateCoupon.execute({ couponId: invalidId })

    expect(isValid).toBe(false)
  })
})
