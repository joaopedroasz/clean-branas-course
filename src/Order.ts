import { CPF } from '@/CPF'
import { Coupon } from '@/Coupon'
import { Item } from '@/Item'
import { OrderItem } from '@/OrderItem'
import { InvalidEmptyID } from './errors'
import { Freight } from './Freight'

export class Order {
  public id?: string
  public orderItems: OrderItem[]
  public cpf: CPF
  public coupon?: Coupon
  private freight: number

  constructor (
    cpf: string,
    id?: string
  ) {
    this.id = id
    this.orderItems = []
    this.cpf = new CPF(cpf)
    this.freight = 0
  }

  private isItemsEmpty (): boolean {
    return !this.orderItems || this.orderItems.length === 0
  }

  public getFreight (): number {
    return this.freight
  }

  public addItem (item: Item, quantity: number): void {
    if (!item.id) throw new InvalidEmptyID()

    this.orderItems.push(new OrderItem(item.id, quantity, item.price))
    this.calculateFreight(item)
  }

  private calculateFreight (item: Item): void {
    const freight = new Freight(item)

    this.freight += freight.calculate()
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
