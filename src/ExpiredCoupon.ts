export class ExpiredCouponError extends Error {
  constructor (dueDate: Date) {
    super(`Coupon expired at ${dueDate}`)
    this.name = 'ExpiredCouponError'
  }
}
