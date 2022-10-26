import { EntityNotFoundError, EntityNotFoundProps } from './EntityNotFound'

export class OrderItemNotFoundError extends EntityNotFoundError {
  constructor (props: EntityNotFoundProps) {
    super('order item', props)
  }
}
