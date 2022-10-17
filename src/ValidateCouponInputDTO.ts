type ValidateCouponInputProps = {
  couponCode: string
}

export class ValidateCouponInputDTO {
  public readonly couponCode: string

  constructor ({ couponCode }: ValidateCouponInputProps) {
    this.couponCode = couponCode
  }
}
