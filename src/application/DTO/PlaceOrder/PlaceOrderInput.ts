type OrderItemInput = {
  idItem: number
  quantity: number
}

export class PlaceOrderInput {
  public readonly CPF: string
  public readonly orderItems: OrderItemInput[]

  constructor (CPF: string, orderItems: OrderItemInput[]) {
    this.CPF = CPF
    this.orderItems = orderItems
  }
}
