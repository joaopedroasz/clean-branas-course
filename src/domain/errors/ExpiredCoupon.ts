export class ExpiredCouponError extends Error {
  constructor (date?: Date) {
    super(`Cannot create a expired Coupon. Date: ${date}`)
  }
}
