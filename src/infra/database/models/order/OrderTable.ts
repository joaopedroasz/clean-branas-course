import { OrderTableProperties } from './types'

export class OrderTable {
  public readonly id: string
  public readonly buyer_cpf: string
  public readonly issue_date: Date
  public readonly price: number
  public readonly coupon_id?: string
  public readonly freight_value: number
  public readonly code: string

  constructor (
    {
      id,
      buyer_cpf: buyerCPF,
      issue_date: issueDate,
      price,
      coupon_id: couponId,
      freight_value: freightValue,
      code
    }: OrderTableProperties
  ) {
    this.id = id
    this.buyer_cpf = buyerCPF
    this.issue_date = issueDate
    this.price = price
    this.coupon_id = couponId
    this.freight_value = freightValue
    this.code = code
  }
}
