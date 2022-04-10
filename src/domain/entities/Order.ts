import { OrderItem, Item, Coupon, CPF, OrderCode } from '@/domain/entities'
import { OrderProperties } from './types'
import { InvalidEmptyIdError } from '../errors'

export class Order {
  private readonly id?: string
  private readonly orderItems: OrderItem[]
  private readonly cpf: CPF
  private readonly issueDate: Date
  private coupon?: Coupon
  private readonly freight: number
  private readonly orderCode: string

  constructor (
    {
      id,
      cpf,
      issueDate = new Date(),
      freight = 0
    }: OrderProperties
  ) {
    this.id = id
    this.orderItems = []
    this.cpf = new CPF(cpf)
    this.issueDate = issueDate
    this.freight = freight
    this.orderCode = this.generateOrderCode()
  }

  private generateOrderCode (): string {
    const orderCode = new OrderCode({ currentDate: this.issueDate })
    return orderCode.getCode()
  }

  public getOrderItems (): OrderItem[] {
    return this.orderItems
  }

  public getCPF (): string {
    return this.cpf.getValue()
  }

  public getIssueDate (): Date {
    return this.issueDate
  }

  public getCouponId (): string | undefined {
    return this.coupon?.getId()
  }

  public getFreight (): number {
    return this.freight
  }

  public getOrderCode (): string {
    return this.orderCode
  }

  public addCoupon (coupon: Coupon): void {
    if (!coupon.getId()) throw new InvalidEmptyIdError()

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
  }
}
