import { EntityNotFount } from './EntityNotFound'

export class CouponNotFoundError extends EntityNotFount {
  constructor (id: string) {
    super('Coupon', id)
  }
}
