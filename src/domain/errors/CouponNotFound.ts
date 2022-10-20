import { EntityNotFoundError, EntityNotFoundProps } from './EntityNotFound'

export class CouponNotFoundError extends EntityNotFoundError {
  constructor (props: EntityNotFoundProps) {
    super('coupon', props)
  }
}
