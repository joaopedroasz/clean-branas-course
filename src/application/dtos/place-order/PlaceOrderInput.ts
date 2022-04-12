import { OrderItemInput } from './types'

export class PlaceOrderInput {
  public readonly CPF: string
  public readonly orderItems: OrderItemInput[]
  public readonly couponId?: string

  constructor (CPF: string, orderItems: OrderItemInput[], couponId?: string) {
    this.CPF = CPF
    this.orderItems = orderItems
    this.couponId = couponId
  }
}
