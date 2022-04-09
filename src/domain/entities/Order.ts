import { Freight, OrderItem, Item, Coupon, CPF, OrderCode } from '@/domain/entities'
import { OrderProperties } from './types'
import { InvalidEmptyIdError } from '../errors'

export class Order {
  public readonly id?: string
  public orderItems: OrderItem[]
  public readonly cpf: CPF
  public issueDate: Date
  public coupon?: Coupon
  private freight: number
  public readonly orderCode: string

  constructor (
    {
      id,
      cpf,
      issueDate = new Date()
    }: OrderProperties
  ) {
    this.id = id
    this.orderItems = []
    this.cpf = new CPF(cpf)
    this.issueDate = issueDate
    this.freight = 0
    this.orderCode = this.generateOrderCode()
  }

  private generateOrderCode (): string {
    const orderCode = new OrderCode({ currentDate: this.issueDate })
    return orderCode.getCode()
  }

  public getFreight (): number {
    return this.freight
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

  private isItemsEmpty (): boolean {
    return !this.orderItems || this.orderItems.length === 0
  }

  public addItem (item: Item, quantity: number): void {
    if (!item.id) throw new InvalidEmptyIdError()

    const orderItem = new OrderItem({
      itemId: item.id,
      price: item.price,
      quantity
    })

    this.orderItems.push(orderItem)
    this.calculateFreight(item, quantity)
  }

  private calculateFreight (item: Item, quantity: number): void {
    const freight = new Freight({ item, quantity })

    this.freight += freight.calculate()
  }
}
