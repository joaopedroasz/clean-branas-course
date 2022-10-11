import { Coupon, CouponProps } from '@/Coupon'
import { InvalidPercentageError } from '@/InvalidPercentage'

const makeSut = (props: CouponProps): Coupon => new Coupon(props)

describe('Coupon', () => {
  let sut: Coupon

  beforeEach(() => {
    sut = makeSut({
      code: 'any_code',
      percentage: 10
    })
  })

  it('should create a coupon with valid percentage', () => {
    const sut = makeSut({ code: 'any_code', percentage: 10 })
    expect(sut).toBeDefined()
  })

  it('should not create a coupon with percentage bigger than 100', () => {
    const error = (): Coupon => makeSut({
      percentage: 101,
      code: 'any_code'
    })

    expect(error).toThrowError(new InvalidPercentageError(101))
  })

  it('should not create a coupon with percentage less than 0', () => {
    const error = (): Coupon => makeSut({
      percentage: -1,
      code: 'any_code'
    })

    expect(error).toThrowError(new InvalidPercentageError(-1))
  })

  it('should not create a coupon with percentage equal to 0', () => {
    const error = (): Coupon => makeSut({
      percentage: 0,
      code: 'any_code'
    })

    expect(error).toThrowError(new InvalidPercentageError(0))
  })

  it('should create a coupon with percentage equal to 100', () => {
    const sut = makeSut({
      percentage: 100,
      code: 'any_code'
    })

    expect(sut).toBeDefined()
  })

  it('should calculate discount', () => {
    expect(sut.calculatePriceDiscount(100)).toBe(90)
  })
})
