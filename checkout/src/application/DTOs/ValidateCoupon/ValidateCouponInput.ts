type ValidateCouponInputProps = {
  couponCode: string
  date?: Date
}

export class ValidateCouponInputDTO {
  public readonly couponCode: string
  public readonly date?: Date

  constructor ({ couponCode, date }: ValidateCouponInputProps) {
    this.couponCode = couponCode
    this.date = date
  }
}
