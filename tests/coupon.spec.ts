import { Coupon } from '@/coupon'
import { ExpiredCouponError } from '@/errors/ExpiredCoupon'

const makeSut = (code: string, percentage: number, expiresIn?: Date, id?: string): Coupon => {
  return new Coupon(code, percentage, expiresIn, id)
}

describe('Coupon entity', () => {
  let coupon: Coupon

  beforeEach(() => {
    coupon = makeSut('Código do cupom 1', 10, new Date(), '1')
  })

  test('should create a coupon', () => {
    expect(coupon).toBeDefined()
  })

  test('should calculate new value from discount', () => {
    const newValue = coupon.calculateValueWithDiscount(100)

    expect(newValue).toBe(90)
  })

  test('should throw a Error when expired', () => {
    const expiredDate = new Date('02/05/2022')
    expect(() => makeSut('Código do cupom expirado', 10, expiredDate, '1')).toThrowError(new ExpiredCouponError(expiredDate))
  })
})
