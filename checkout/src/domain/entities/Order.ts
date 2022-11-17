import { ForbiddenAddDuplicatedItemError } from '@/domain/errors'
import { Coupon } from './Coupon'
import { CPF } from './CPF'
import { Item } from './Item'
import { OrderCode } from './OrderCode'
import { OrderCoupon } from './OrderCoupon'
import { OrderItem } from './OrderItem'

export type OrderProps = {
  buyerCPF: string
  purchaseDate?: Date
  sequence: number
  freight?: number
}

export type AddItemProps = {
  item: Item
  quantity: number
}

export class Order {
  private readonly buyerCPF: CPF
  private readonly orderItems: OrderItem[]
  private readonly purchaseDate: Date
  private coupon?: OrderCoupon
  private readonly code: OrderCode
  private readonly freight: number

  constructor ({
    buyerCPF,
    purchaseDate = new Date(),
    sequence,
    freight = 0
  }: OrderProps) {
    this.buyerCPF = new CPF(buyerCPF)
    this.orderItems = []
    this.coupon = undefined
    this.purchaseDate = purchaseDate
    this.code = new OrderCode({ date: purchaseDate, sequence })
    this.freight = freight
  }

  public getFreight (): number {
    return this.freight
  }

  public getOrderItems (): OrderItem[] {
    return this.orderItems
  }

  public getCouponCode (): string | undefined {
    return this.coupon?.getCode()
  }

  public getCode (): string {
    return this.code.getCode()
  }

  public getCPF (): string {
    return this.buyerCPF.getCPF()
  }

  public getPurchaseDate (): Date {
    return this.purchaseDate
  }

  public addItem ({ item, quantity }: AddItemProps): void {
    if (this.alreadyHasItem(item.getId())) throw new ForbiddenAddDuplicatedItemError(item.getId())
    this.orderItems.push(item.createOrderItem(quantity))
  }

  private alreadyHasItem (itemId: string): boolean {
    return this.orderItems.some(orderItem => orderItem.getItemId() === itemId)
  }

  public addCoupon (coupon: Coupon): void {
    if (coupon.isExpired(this.purchaseDate)) return
    this.coupon = coupon.createOrderCoupon()
  }

  public getTotalPrice (): number {
    let totalPrice = 0
    for (const orderItem of this.orderItems) {
      totalPrice += orderItem.calculatePrice()
    }
    if (!this.coupon) return totalPrice

    return this.coupon.calculatePriceDiscount(totalPrice)
  }
}
