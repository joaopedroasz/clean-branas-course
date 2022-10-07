import { Coupon } from '@/Coupon'
import { InvalidPercentageError } from '@/InvalidPercentage'

describe('Coupon', () => {
  it('should create a coupon with valid percentage', () => {
    const coupon = new Coupon({
      code: 'VALE20',
      percentage: 20
    })

    expect(coupon).toBeDefined()
  })

  it('should not create a coupon with percentage bigger than 100', () => {
    const coupon = (): Coupon => new Coupon({
      code: 'VALE200',
      percentage: 200
    })

    expect(coupon).toThrowError(new InvalidPercentageError(200))
  })

  it('should not create a coupon with percentage less than 0', () => {
    const coupon = (): Coupon => new Coupon({
      code: 'VALE-20',
      percentage: -20
    })

    expect(coupon).toThrowError(new InvalidPercentageError(-20))
  })

  it('should not create a coupon with percentage equal to 0', () => {
    const coupon = (): Coupon => new Coupon({
      code: 'VALE0',
      percentage: 0
    })

    expect(coupon).toThrowError(new InvalidPercentageError(0))
  })

  it('should create a coupon with percentage equal to 100', () => {
    const coupon = new Coupon({
      code: 'VALE100',
      percentage: 100
    })

    expect(coupon).toBeDefined()
  })

  it('should calculate discount', () => {
    const coupon = new Coupon({
      code: 'VALE20',
      percentage: 20
    })

    expect(coupon.calculatePriceDiscount(100)).toBe(80)
  })
})
