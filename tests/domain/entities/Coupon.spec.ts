import { Coupon, CouponProperties } from '@/domain/entities'
import { ExpiredCouponError } from '@/domain/errors'

const makeSut = (
  {
    id,
    code,
    percentage,
    currentDate = new Date(),
    expiresIn
  }: CouponProperties
): Coupon => {
  return new Coupon({ id, code, percentage, currentDate, expiresIn })
}

describe('Coupon entity', () => {
  let coupon: Coupon
  const currentDate = new Date('02/13/2022')
  const expiredDate = new Date('02/05/2022')
  const validDate = new Date('02/14/2022')

  beforeEach(() => {
    coupon = makeSut({
      id: '1',
      code: 'Código do cupom 1',
      percentage: 10,
      currentDate,
      expiresIn: validDate
    })
  })

  test('should create a coupon', () => {
    expect(coupon).toBeDefined()
  })

  test('should calculate new value from discount', () => {
    const newValue = coupon.calculateValueWithDiscount(100)

    expect(newValue).toBe(90)
  })

  test('should throw a Error when expired', () => {
    const createExpiredCoupon = (): Coupon => makeSut({
      id: '1',
      code: 'Código do cupom expirado',
      percentage: 10,
      currentDate,
      expiresIn: expiredDate
    })

    expect(createExpiredCoupon).toThrowError(new ExpiredCouponError(expiredDate))
  })

  test('should return false when validate using default current date', () => {
    const isExpired = coupon.isValid()

    expect(isExpired).toBe(false)
  })
})
