import { SearchOrderByCodeOutputItemProps, SearchOrderByCodeOutputProps } from './types'

export class SearchOrderByCodeOutput {
  public readonly orderId: string
  public readonly orderCode: string
  public readonly buyerCPF: string
  public readonly issueDate: Date
  public readonly price: number
  public readonly freightValue: number
  public readonly couponId?: string
  public readonly items: SearchOrderByCodeOutputItemProps[]

  constructor ({
    orderId,
    orderCode,
    buyerCPF,
    issueDate,
    price,
    freightValue,
    couponId,
    items
  }: SearchOrderByCodeOutputProps) {
    this.orderId = orderId
    this.orderCode = orderCode
    this.buyerCPF = buyerCPF
    this.issueDate = issueDate
    this.price = price
    this.freightValue = freightValue
    this.couponId = couponId
    this.items = items
  }
}
