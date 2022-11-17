import { OrderCoupon, OrderCouponProps } from '@/domain/entities'
import { InvalidPercentageError } from '@/domain/errors'

const makeSut = (props?: Partial<OrderCouponProps>): OrderCoupon => new OrderCoupon({
  code: 'any_code',
  percentage: 10,
  ...props
})

describe('OrderCoupon', () => {
  it('should create valid self instance', () => {
    const sut = makeSut()

    expect(sut).toBeInstanceOf(OrderCoupon)
  })

  it('should throw InvalidPercentageError if percentage is less than 0', () => {
    expect(() => makeSut({ percentage: -1 })).toThrowError(new InvalidPercentageError(-1))
  })

  it('should calculate discount', () => {
    const sut = makeSut()

    const discount = sut.calculatePriceDiscount(100)

    expect(discount).toBe(90)
  })

  it('should return percentage discount', () => {
    const sut = makeSut()

    const percentageDiscount = sut.getPercentageDiscount(350)

    expect(percentageDiscount).toBe(35)
  })
})
