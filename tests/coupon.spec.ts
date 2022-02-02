import { Coupon } from '@/coupon'

const makeSut = (percentage: number, id?: string): Coupon => {
  return new Coupon(percentage, id)
}

describe('Coupon entity', () => {
  test('should create a coupon', () => {
    const coupon = makeSut(10, '1')

    expect(coupon).toBeDefined()
  })
})
