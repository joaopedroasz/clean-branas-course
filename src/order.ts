import { CPF } from '@/cpf'
import { Coupon } from './coupon'
import { OrderItem } from './order-item'

export class Order {
  public id?: string
  public orderItems: OrderItem[]
  public cpf: CPF
  public totalPrice: number
  public readonly coupon?: Coupon

  constructor (
    cpf: string,
    totalPrice: number,
    coupon?: Coupon,
    id?: string
  ) {
    this.id = id
    this.orderItems = []
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
