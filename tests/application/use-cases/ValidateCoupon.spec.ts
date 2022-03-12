import { ValidateCoupon } from '@/application/use-cases'

type makeSutTypes = {
  validateCoupon: ValidateCoupon
}

const makeSut = (): makeSutTypes => {
  const validateCoupon = new ValidateCoupon()

  return {
    validateCoupon
  }
}

describe('Validate Coupon use case', () => {
  test('should create a validate coupon', () => {
    const { validateCoupon } = makeSut()

    expect(validateCoupon).toBeDefined()
  })
})
