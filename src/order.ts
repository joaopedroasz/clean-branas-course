import { CPF } from '@/cpf'
import { Coupon } from './coupon'

export class Order {
  public id: string
  public orderItemIds: string[]
  public cpf: CPF
  public totalPrice: number
  public readonly coupon?: Coupon

  constructor (
    id: string,
    orderItemId: string[],
    cpf: string,
    totalPrice: number,
    coupon?: Coupon
  ) {
    this.id = id
    this.orderItemIds = orderItemId
    this.cpf = new CPF(cpf)
    this.totalPrice = totalPrice
    this.coupon = coupon
  }

  public calculatePriceWithDiscount (): number {
    if (!this.coupon) throw new Error('coupon not exists')
    const couponDiscount = this.totalPrice * (this.coupon.percentage / 100)
    const totalPriceWithDiscount = this.totalPrice - couponDiscount
    return totalPriceWithDiscount
  }
}
