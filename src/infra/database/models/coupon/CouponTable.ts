import { CouponTableProperties } from './types'

export class CouponTable {
  public readonly id: string
  public readonly code: string
  public readonly percentage: number
  public readonly expired_date: Date

  constructor ({
    id,
    code,
    percentage,
    expire_date: expireDate
  }: CouponTableProperties) {
    this.id = id
    this.code = code
    this.percentage = percentage
    this.expired_date = expireDate
  }
}
