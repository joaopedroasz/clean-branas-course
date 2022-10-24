type Item = {
  id: string
  description: string
  quantity: number
  price: number
  weight: number
  height: number
  width: number
  length: number
  depth: number
}

type Coupon = {
  code: string
  percentage: number
  discount: number
  expirationDate: Date
}

type SearchOrderByCodeOutputProps = {
  code: string
  CPF: string
  total: number
  purchaseDate: Date
  items: Item[]
  coupon?: Coupon
}

export class SearchOrderByCodeOutput {
  public readonly code: string
  public readonly CPF: string
  public readonly total: number
  public readonly purchaseDate: Date
  public readonly items: Item[]
  public readonly coupon?: Coupon

  constructor ({
    code,
    CPF,
    total,
    purchaseDate,
    items,
    coupon
  }: SearchOrderByCodeOutputProps) {
    this.code = code
    this.CPF = CPF
    this.total = total
    this.purchaseDate = purchaseDate
    this.items = items
    this.coupon = coupon
  }
}
