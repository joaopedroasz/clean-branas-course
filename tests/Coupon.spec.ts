import { Coupon } from '@/Coupon'

describe('Coupon', () => {
  it('should create a coupon with valid percentage', () => {
    const coupon = new Coupon({
      code: 'VALE20',
      percentage: 20
    })

    expect(coupon).toBeDefined()
  })
})
