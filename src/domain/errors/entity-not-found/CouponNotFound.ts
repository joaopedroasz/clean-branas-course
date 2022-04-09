import { EntityNotFountError } from './EntityNotFound'

export class CouponNotFoundError extends EntityNotFountError {
  constructor (id: string) {
    super('Coupon', id)
  }
}
