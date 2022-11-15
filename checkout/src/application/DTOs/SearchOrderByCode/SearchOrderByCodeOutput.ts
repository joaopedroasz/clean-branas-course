export type SearchOrderByCodeOutputItem = {
  id: string
  description: string
  price: number
  weight: number
  height: number
  width: number
  depth: number
}

type Coupon = {
  code: string
  percentage: number
  discount: number
  expirationDate: Date
}

export type SearchOrderByCodeOutputOrderItem = {
  quantity: number
  item: SearchOrderByCodeOutputItem
}

type SearchOrderByCodeOutputProps = {
  code: string
  CPF: string
  total: number
  purchaseDate: Date
  orderItems: SearchOrderByCodeOutputOrderItem[]
  coupon?: Coupon
}

export class SearchOrderByCodeOutput {
  public readonly code: string
  public readonly CPF: string
  public readonly total: number
  public readonly purchaseDate: Date
  public readonly orderItems: SearchOrderByCodeOutputOrderItem[]
  public readonly coupon?: Coupon

  constructor ({
    code,
    CPF,
    total,
    purchaseDate,
    orderItems,
    coupon
  }: SearchOrderByCodeOutputProps) {
    this.code = code
    this.CPF = CPF
    this.total = total
    this.purchaseDate = purchaseDate
    this.orderItems = orderItems
    this.coupon = coupon
  }
}
