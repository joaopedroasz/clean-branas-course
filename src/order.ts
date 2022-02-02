import { CPF } from '@/cpf'
import { Coupon } from './coupon'
import { OrderItem } from './order-item'

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
}
