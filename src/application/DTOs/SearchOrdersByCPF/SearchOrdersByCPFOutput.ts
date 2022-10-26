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

export type SearchOrdersByCPFOutputProps = {
  code: string
  CPF: string
  purchaseDate: Date
  totalValue: number
  orderItems: SearchOrdersByCPFOutputOrderItem[]
}

export class SearchOrdersByCPFOutput implements SearchOrdersByCPFOutputProps {
  public readonly code: string
  public readonly CPF: string
  public readonly purchaseDate: Date
  public readonly totalValue: number
  public readonly orderItems: SearchOrdersByCPFOutputOrderItem[]

  constructor ({
    code,
    CPF,
    purchaseDate,
    totalValue,
    orderItems
  }: SearchOrdersByCPFOutputProps) {
    this.code = code
    this.CPF = CPF
    this.purchaseDate = purchaseDate
    this.totalValue = totalValue
    this.orderItems = orderItems
  }
}
