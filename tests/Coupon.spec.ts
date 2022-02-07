import { Coupon } from '@/Coupon'
import { ExpiredCouponError } from '@/errors'

const makeSut = (code: string, percentage: number, expiresIn?: Date, id?: string): Coupon => {
  return new Coupon(code, percentage, expiresIn, id)
}

describe('Coupon entity', () => {
  let coupon: Coupon

  beforeEach(() => {
    const currentDateDummy = new Date()
    const tomorrowDateDummy = new Date(currentDateDummy)
    tomorrowDateDummy.setDate(currentDateDummy.getDate() + 1)

    coupon = makeSut('Código do cupom 1', 10, new Date(tomorrowDateDummy), '1')
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
