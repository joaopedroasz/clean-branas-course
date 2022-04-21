import { CouponRepository } from '@/domain/repositories'
import { CouponNotFoundError } from '@/domain/errors'

import { ValidateCoupon } from '@/application/use-cases'
import { ValidateCouponInput } from '@/application/dtos'

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
  const validateCouponInput: ValidateCouponInput = {
    couponId: '1',
    currentDate: new Date('03/13/2022')
  }

  test('should create a validate coupon', () => {
    const { validateCoupon } = makeSut()

    expect(validateCoupon).toBeDefined()
  })

  test('should return true when valid Id is provided', async () => {
    const { validateCoupon } = makeSut()

    const isValid = await validateCoupon.execute(validateCouponInput)

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

    const isValid = await validateCoupon.execute(validateCouponInput)

    expect(isValid).toBe(false)
  })

  test('should call couponRepository with correct parameters', async () => {
    const { validateCoupon, couponRepository } = makeSut()
    const couponRepositorySpy = jest.spyOn(couponRepository, 'getById')

    await validateCoupon.execute(validateCouponInput)

    expect(couponRepositorySpy).toBeCalled()
    expect(couponRepositorySpy).toBeCalledTimes(1)
    expect(couponRepositorySpy).toBeCalledWith('1')
  })
})
