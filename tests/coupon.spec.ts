import { Coupon } from '@/coupon'

const makeSut = (percentage: number): Coupon => {
  return new Coupon(percentage)
}

describe('Coupon entity', () => {
  test('should create a coupon', () => {
    const coupon = makeSut(10)

    expect(coupon).toBeDefined()
  })
})
