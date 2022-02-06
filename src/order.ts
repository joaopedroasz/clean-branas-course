import { CPF } from '@/cpf'
import { Coupon } from '@/coupon'
import { Item } from '@/item'
import { OrderItem } from '@/order-item'
import { InvalidEmptyID } from './errors'

export class Order {
  public id?: string
  public orderItems: OrderItem[]
  public cpf: CPF
  public coupon?: Coupon

  constructor (
    cpf: string,
    id?: string
  ) {
    this.id = id
    this.orderItems = []
    this.cpf = new CPF(cpf)
  }

  private isItemsEmpty (): boolean {
    return !this.orderItems || this.orderItems.length === 0
  }

  public addItem (item: Item, quantity: number): void {
    if (!item.id) throw new InvalidEmptyID()

    this.orderItems.push(new OrderItem(item.id, quantity, item.price))
  }

  public addCoupon (coupon: Coupon): void {
    this.coupon = coupon
  }

  public getTotalPrice (): number {
    if (this.isItemsEmpty()) return 0

    let totalPrice = 0
    for (const orderItem of this.orderItems) {
      totalPrice += orderItem.getTotalPrice()
    }

    if (!this.coupon) return totalPrice

    return this.coupon.calculateValueWithDiscount(totalPrice)
  }
}
