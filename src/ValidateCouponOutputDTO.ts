type CouponOutput = {
  code: string
  dueDate?: Date
  percentage: number
}

type ValidateCouponOutputProps = {
  coupon: CouponOutput
  isValid: boolean
}

export class ValidateCouponOutputDTO {
  public readonly coupon: CouponOutput
  public readonly isValid: boolean

  constructor ({ coupon, isValid }: ValidateCouponOutputProps) {
    this.coupon = coupon
    this.isValid = isValid
  }
}
