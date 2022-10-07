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

  constructor ({
    buyerCPF
  }: OrderProps) {
    this.buyerCPF = new CPF(buyerCPF)
    this.orderItems = []
  }

  public getOrderItems (): OrderItem[] {
    return this.orderItems
  }

  public addItem ({ item, quantity }: AddItemProps): void {
    this.orderItems.push(new OrderItem({ item, quantity }))
  }

  public getTotalPrice (): number {
    let totalPrice = 0
    for (const orderItem of this.orderItems) {
      totalPrice += orderItem.calculatePrice()
    }
    return totalPrice
  }
}
