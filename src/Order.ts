import { Coupon } from './Coupon'
import { CPF } from './CPF'
import { ForbiddenAddDuplicatedItemError } from './ForbiddenAddDuplicatedItem'
import { FreightCalculator } from './FreightCalculator'
import { Item } from './Item'
import { OrderItem } from './OrderItem'

export type OrderProps = {
  buyerCPF: string
  purchaseDate?: Date
}

export type AddItemProps = {
  item: Item
  quantity: number
}

export class Order {
  private readonly buyerCPF: CPF
  private readonly orderItems: OrderItem[]
  private readonly purchaseDate: Date
  private coupon?: Coupon
  private freight: number

  constructor ({
    buyerCPF,
    purchaseDate = new Date()
  }: OrderProps) {
    this.buyerCPF = new CPF(buyerCPF)
    this.orderItems = []
    this.coupon = undefined
    this.freight = 0
    this.purchaseDate = purchaseDate
  }

  public getOrderItems (): OrderItem[] {
    return this.orderItems
  }

  public getCoupon (): Coupon | undefined {
    return this.coupon
  }

  public addItem ({ item, quantity }: AddItemProps): void {
    if (this.alreadyHasItem(item.getId())) throw new ForbiddenAddDuplicatedItemError(item.getId())
    this.orderItems.push(new OrderItem({
      itemId: item.getId(),
      price: item.getPrice(),
      quantity
    }))
    this.freight += new FreightCalculator({ item, quantity }).calculate()
  }

  private alreadyHasItem (itemId: string): boolean {
    return this.orderItems.some(orderItem => orderItem.getItemId() === itemId)
  }

  public addCoupon (coupon: Coupon): void {
    if (coupon.isExpired(this.purchaseDate)) return
    this.coupon = coupon
  }

  public getTotalPrice (): number {
    let totalPrice = this.freight
    for (const orderItem of this.orderItems) {
      totalPrice += orderItem.calculatePrice()
    }
    if (!this.coupon) return totalPrice

    return this.coupon.calculatePriceDiscount(totalPrice)
  }
}
