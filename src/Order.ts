import { Coupon } from './Coupon'
import { CPF } from './CPF'
import { Item } from './Item'
import { OrderItem } from './OrderItem'

export type OrderProps = {
  buyerCPF: string
}

export type AddItemProps = {
  item: Item
  quantity: number
}

export class Order {
  private readonly buyerCPF: CPF
  private readonly orderItems: OrderItem[]
  private coupon?: Coupon

  constructor ({
    buyerCPF
  }: OrderProps) {
    this.buyerCPF = new CPF(buyerCPF)
    this.orderItems = []
    this.coupon = undefined
  }

  public getOrderItems (): OrderItem[] {
    return this.orderItems
  }

  public getCoupon (): Coupon | undefined {
    return this.coupon
  }

  public addItem ({ item, quantity }: AddItemProps): void {
    this.orderItems.push(new OrderItem({ item, quantity }))
  }

  public addCoupon (coupon: Coupon): void {
    this.coupon = coupon
  }

  public getTotalPrice (): number {
    let totalPrice = 0
    for (const orderItem of this.orderItems) {
      totalPrice += orderItem.calculatePrice()
    }
    return totalPrice
  }
}
