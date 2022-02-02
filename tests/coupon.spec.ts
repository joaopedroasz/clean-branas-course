import { Coupon } from '@/coupon'

const makeSut = (code: string, percentage: number, id?: string): Coupon => {
  return new Coupon(code, percentage, id)
}

describe('Coupon entity', () => {
  test('should create a coupon', () => {
    const coupon = makeSut('Código do cupom 1', 10, '1')

    expect(coupon).toBeDefined()
  })
})
