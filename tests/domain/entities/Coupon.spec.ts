import { Coupon } from '@/domain/entities'
import { ExpiredCouponError } from '@/domain/entities/errors'

const makeSut = (code: string, percentage: number, currentDate = new Date(), expiresIn?: Date, id?: string): Coupon => {
  return new Coupon(code, percentage, currentDate, expiresIn, id)
}

describe('Coupon entity', () => {
  let coupon: Coupon
  const currentDate = new Date('02/13/2022')
  const expiredDate = new Date('02/05/2022')
  const validDate = new Date('02/14/2022')

  beforeEach(() => {
    coupon = makeSut('Código do cupom 1', 10, currentDate, validDate, '1')
  })

  test('should create a coupon', () => {
    expect(coupon).toBeDefined()
  })

  test('should calculate new value from discount', () => {
    const newValue = coupon.calculateValueWithDiscount(100)

    expect(newValue).toBe(90)
  })

  test('should throw a Error when expired', () => {
    expect(() => makeSut('Código do cupom expirado', 10, currentDate, expiredDate, '1')).toThrowError(new ExpiredCouponError(expiredDate))
  })
})
