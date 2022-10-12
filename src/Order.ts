import { Coupon } from './Coupon'
import { CPF } from './CPF'
import { ForbiddenAddDuplicatedItemError } from './ForbiddenAddDuplicatedItem'
import { OrderItem } from './OrderItem'

export type OrderProps = {
  buyerCPF: string
}

export type AddItemProps = {
  itemId: string
  price: number
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

  public addItem ({ itemId, price, quantity }: AddItemProps): void {
    if (this.alreadyHasItem(itemId)) throw new ForbiddenAddDuplicatedItemError(itemId)
    this.orderItems.push(new OrderItem({ itemId, price, quantity }))
  }

  private alreadyHasItem (itemId: string): boolean {
    return this.orderItems.some(orderItem => orderItem.getItemId() === itemId)
  }

  public addCoupon (coupon: Coupon): void {
    this.coupon = coupon
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
