import { Order } from '@/order'
import { Coupon } from '@/coupon'

const makeSut = (
  id: string,
  orderItemIds: string[],
  cpf: string,
  totalPrice: number,
  coupon?: Coupon
): Order => {
  return new Order(id, orderItemIds, cpf, totalPrice, coupon)
}

describe('Order entity', () => {
  test('should create a order', () => {
    const order = makeSut('123', ['222'], '518.858.724-61', 100)

    expect(order).toBeDefined()
  })

  test('should throw a Error when cpf is invalid', () => {
    expect(() => makeSut('11', ['111'], '222.222.222-22', 100)).toThrowError('Invalid CPF')
  })

  test('should create a order with many items', () => {
    const order = makeSut('123', ['222', '122', '333'], '518.858.724-61', 100)

    expect(order).toBeDefined()
  })

  test('should create a order with coupon discount', () => {
    const order = makeSut('123', ['222', '122', '333'], '518.858.724-61', 100, new Coupon(10))
    const priceWithDiscount = order.calculatePriceWithDiscount()

    expect(priceWithDiscount).toBe(90)
  })

  test('should throw a Error when calculate a discount without coupon', () => {
    const order = makeSut('123', ['222', '122', '333'], '518.858.724-61', 100)

    expect(() => order.calculatePriceWithDiscount()).toThrowError('coupon not exists')
  })
})
