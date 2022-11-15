import { EntityNotFoundError, EntityNotFoundProps } from './EntityNotFound'

export class OrderNotFoundError extends EntityNotFoundError {
  constructor (props: EntityNotFoundProps) {
    super('order', props)
    this.name = 'OrderNotFoundError'
  }
}
