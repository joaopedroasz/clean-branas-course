import { CPF } from '@/cpf'
import { Coupon } from '@/coupon'
import { Item } from '@/item'
import { OrderItem } from '@/order-item'

export class Order {
  public id?: string
  public orderItems: OrderItem[]
  public cpf: CPF
  public readonly coupon?: Coupon

  constructor (
    cpf: string,
    id?: string
  ) {
    this.id = id
    this.orderItems = []
    this.cpf = new CPF(cpf)
  }

  public addItem (item: Item, quantity: number): void {
    if (!item.id) {
      throw new Error('invalid empty id')
    }

    this.orderItems.push(new OrderItem(item.id, quantity, item.price))
  }
}
