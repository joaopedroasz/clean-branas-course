export type SearchOrdersByCPFOutputItem = {
  id: string
  description: string
  price: number
  weight: number
  height: number
  width: number
  depth: number
}

export type SearchOrdersByCPFOutputOrderItem = {
  quantity: number
  item: SearchOrdersByCPFOutputItem
}

export type SearchOrdersByCPFOutputOrder = {
  code: string
  CPF: string
  purchaseDate: Date
  totalValue: number
  orderItems: SearchOrdersByCPFOutputOrderItem[]
}

export type SearchOrdersByCPFOutputProps = {
  orders: SearchOrdersByCPFOutputOrder[]
}

export class SearchOrdersByCPFOutputDTO {
  public readonly orders: SearchOrdersByCPFOutputOrder[]

  constructor ({ orders }: SearchOrdersByCPFOutputProps) {
    this.orders = orders
  }
}
