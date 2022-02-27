import { InvalidEmptyID } from './errors'
import { Freight, OrderItem, Item, Coupon, CPF } from '@/domain/entities'

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

    const orderItem = new OrderItem({
      itemId: item.id,
      price: item.price,
      quantity
    })

    this.orderItems.push(orderItem)
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
