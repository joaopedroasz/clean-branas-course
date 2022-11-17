import { OrderCoupon, OrderCouponProps } from '@/domain/entities'

const makeSut = (props?: Partial<OrderCouponProps>): OrderCoupon => new OrderCoupon({
  code: 'any_code',
  percentage: 10
})

describe('OrderCoupon', () => {
  it('should create valid self instance', () => {
    const sut = makeSut()

    expect(sut).toBeInstanceOf(OrderCoupon)
  })
})
