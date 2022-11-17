export type OrderCouponProps = {
  code: string
  percentage: number
}

export class OrderCoupon {
  public readonly code: string
  public readonly percentage: number

  constructor (props: OrderCouponProps) {
    this.code = props.code
    this.percentage = props.percentage
  }
}
