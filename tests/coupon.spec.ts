import { Coupon } from '@/coupon'

const makeSut = (code: string, percentage: number, id?: string): Coupon => {
  return new Coupon(code, percentage, id)
}

describe('Coupon entity', () => {
  let coupon: Coupon

  beforeEach(() => {
    coupon = makeSut('Código do cupom 1', 10, '1')
  })

  test('should create a coupon', () => {
    expect(coupon).toBeDefined()
  })

  test('should get coupon percentage', () => {
    const couponPercentage = coupon.calculatePercentage()

    expect(couponPercentage).toBe(0.1)
  })
})
