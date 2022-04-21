import { CouponRepository } from '@/domain/repositories'
import { CouponNotFoundError } from '@/domain/errors'

import { ValidateCouponUseCase } from '@/application/contracts'
import { ValidateCoupon } from '@/application/use-cases'
import { ValidateCouponInput } from '@/application/dtos'

import { CouponRepositoryPostgres, DatabaseConnection, DatabaseConnectionAdapter } from '@/infra/database'

type makeSutTypes = {
  validateCoupon: ValidateCouponUseCase
  couponRepository: CouponRepository
  databaseConnection: DatabaseConnection
}

const makeSut = (): makeSutTypes => {
  const databaseConnection = new DatabaseConnectionAdapter()
  const couponRepository = new CouponRepositoryPostgres(databaseConnection)
  const validateCoupon = new ValidateCoupon(couponRepository)

  return {
    validateCoupon,
    couponRepository,
    databaseConnection
  }
}

describe('Validate Coupon use case', () => {
  const { couponRepository, validateCoupon } = makeSut()

  const validateCouponInput: ValidateCouponInput = {
    couponId: '1',
    currentDate: new Date('03/13/2022')
  }

  test('should return false when Coupon Repository does not find coupon', async () => {
    const invalidId = 'invalid_id'
    jest.spyOn(couponRepository, 'getById').mockImplementationOnce(() => {
      throw new CouponNotFoundError(invalidId)
    })

    const isValid = await validateCoupon.execute(validateCouponInput)

    expect(isValid).toBe(false)
  })
})
